import { Opdata, Opimplicit, Opexplicit, EOT } from "./definition"
import { JITCompiler } from "./jitcompiler"

// convert data from byte code to JavaScript object
const uint16 = new Uint16Array(1)
const uint32 = new Uint32Array(1)
const OpdataConvertMap :
    {[index : number] : (bytes : Uint8Array, offset : number, textstack? : string[]) => [number | string, number]} = {

  [Opdata.int8] : (bytes : Uint8Array, offset : number) => {
    const converted = new Int8Array(bytes.buffer.slice(offset, offset + 1))
    return [converted[0], 1]
  },
  [Opdata.uint8] : (bytes : Uint8Array, offset : number) => {
    return [bytes[offset], 1]
  },
  [Opdata.int16] : (bytes : Uint8Array, offset : number) => {
    const converted = new Int16Array(bytes.buffer.slice(offset, offset + 2))
    return [converted[0], 2]
  },
  [Opdata.uint16] : (bytes : Uint8Array, offset : number) => {
    uint16[0] = bytes[offset] + (bytes[offset + 1] << 8)
    return [uint16[0], 2]
  },
  [Opdata.int32] : (bytes : Uint8Array, offset : number) => {
    const converted = new Int32Array(bytes.buffer.slice(offset, offset + 4))
    return [converted[0], 4]
  },
  [Opdata.uint32] : (bytes : Uint8Array, offset : number) => {
    uint32[0] = bytes[offset] + (bytes[offset + 1] << 8) + (bytes[offset + 2] << 16) + (bytes[offset + 3] << 24)
    return [uint32[0], 4]
  },
  [Opdata.float32] : (bytes : Uint8Array, offset : number) => {
    const converted = new Float32Array(bytes.buffer.slice(offset, offset + 4))
    return [converted[0], 4]
  },
  [Opdata.float64] : (bytes : Uint8Array, offset : number) => {
    const converted = new Float64Array(bytes.buffer.slice(offset, offset + 8))
    return [converted[0], 8]
  },
  [Opdata.iot] : (bytes : Uint8Array, offset : number, textstack : string[]) => {
    const [index, len] = OpdataConvertMap[bytes[offset]](bytes, offset + 1)
    return [textstack[index as number], len + 1]
  },
  [Opdata.sot] : (bytes : Uint8Array, offset : number) => {
    let size = 0
    while (true) {
      const byte = bytes[offset + size]
      const next = bytes[offset + size + 1]

      // end with [EOT 0]
      if (byte === EOT && next === 0) break
      size += 2
    }

    const str_bytes = new Uint16Array(bytes.buffer.slice(offset, offset + size))
    const result = String.fromCharCode.apply(null, str_bytes)

    return [result, size + 2]
  }
}

export { OpdataConvertMap }

const OpexplicitSimpleExecMap = {

  // ===== boolean operations =====

  [Opexplicit.eq] : (a : any, b : any) => {
    return a === b ? 1 : 0
  },
  [Opexplicit.gt] : (a : any, b : any) => {
    return a > b ? 1 : 0
  },
  [Opexplicit.ge] : (a : any, b : any) => {
    return a >= b ? 1 : 0
  },
  [Opexplicit.lt] : (a : any, b : any) => {
    return a < b ? 1 : 0
  },
  [Opexplicit.le] : (a : any, b : any) => {
    return a <= b ? 1 : 0
  },

  // ===== mathematical operations =====

  [Opexplicit.add] : (a : any, b : any) => {
    return a + b
  },
  [Opexplicit.sub] : (a : any, b : any) => {
    return a - b
  },
  [Opexplicit.mul] : (a : any, b : any) => {
    return a * b
  },
  [Opexplicit.div] : (a : any, b : any) => {
    return a / b
  },
  [Opexplicit.mod] : (a : any, b : any) => {
    return a % b
  }

}
export { OpexplicitSimpleExecMap }


const OpexplicitExecMapCreater = (ctx : CanvasRenderingContext2D) => {
  return {

    // ===== built-in operations =====

    [Opexplicit.apply] : (_ : any[]) => {},
    [Opexplicit.print] : (args : any[]) => {
      if (console)
        console.log.apply(null, args)
    },
    [Opexplicit.envGet] : (args : any[], env : any) => {
      let result = env
      args.forEach(arg => {
        result = result[arg]
      })
      return result === env ? undefined : result
    },
    [Opexplicit.envSet] : (args : any[], env : any) => {
      env[args[0]] = args[1]
    },
    [Opexplicit.list] : (args : any[]) => {
      return args
    },
    [Opexplicit.index] : (args : any[]) => {
      return args[0][args[1]]
    },
    [Opexplicit.pop] : (args : any[]) => {
      if (!args[0].length)
        throw `list which is empty can not pop element`

      return args[0].pop()
    },
    [Opexplicit.push] : (args : any[]) => {
      return args[0].push(args[1])
    },
    [Opexplicit.shift] : (args : any[]) => {
      if (!args[0].length)
        throw `list which is empty can not shift element`

      return args[0].shift()
    },
    [Opexplicit.unshift] : (args : any[]) => {
      return args[0].unshift(args[1])
    },



    // ===== canvas 2D operations =====

    [Opexplicit.moveTo] : (args : any[]) => {
      ctx.moveTo.apply(ctx, args)
    },
    [Opexplicit.lineTo] : (args : any[]) => {
      ctx.lineTo.apply(ctx, args)
    },
    [Opexplicit.clearRect] : (args : any[]) => {
      ctx.clearRect.apply(ctx, args)
    },
    [Opexplicit.beginPath] : (args : any[]) => {
      ctx.beginPath()
    },
    [Opexplicit.closePath] : (args : any[]) => {
      ctx.closePath()
    },
    [Opexplicit.stroke] : (args : any[]) => {
      ctx.stroke.apply(ctx, args)
    },
    [Opexplicit.arc] : (args : any[]) => {
      ctx.arc.apply(ctx, args)
    },
    [Opexplicit.arcTo] : (args : any[]) => {
      ctx.arcTo.apply(ctx, args)
    },
    [Opexplicit.bezierCurveTo] : (args : any[]) => {
      ctx.bezierCurveTo.apply(ctx, args)
    },
    [Opexplicit.clip] : (args : any[]) => {
      ctx.clip.apply(ctx, args)
    },
    [Opexplicit.createImageData] : (args : any[]) => {
      return ctx.createImageData.apply(ctx, args)
    },
    [Opexplicit.createLinearGradient] : (args : any[]) => {
      return ctx.createLinearGradient.apply(ctx, args)
    },
    [Opexplicit.addColorStop] : (args : any[]) => {
      const gradient = args.shift()
      gradient.addColorStop(args[0], args[1])
      return gradient
    },
    [Opexplicit.createPattern] : (args : any[]) => {
      return ctx.createPattern.apply(ctx, args)
    },
    [Opexplicit.createRadialGradient] : (args : any[]) => {
      return ctx.createRadialGradient.apply(ctx, args)
    },
    [Opexplicit.drawImage] : (args : any[]) => {
      ctx.drawImage.apply(ctx, args)
    },
    [Opexplicit.ellipse] : (args : any[]) => {
      ctx.ellipse.apply(ctx, args)
    },
    [Opexplicit.fill] : (args : any[]) => {
      ctx.fill.apply(ctx, args)
    },
    [Opexplicit.fillRect] : (args : any[]) => {
      ctx.fillRect.apply(ctx, args)
    },
    [Opexplicit.fillText] : (args : any[]) => {
      ctx.fillText.apply(ctx, args)
    },
    [Opexplicit.getImageData] : (args : any[]) => {
      return ctx.getImageData.apply(ctx, args)
    },
    [Opexplicit.getLineDash] : (args : any[]) => {
      return ctx.getLineDash.apply(ctx, args)
    },
    [Opexplicit.isPointInPath] : (args : any[]) => {
      return ctx.isPointInPath.apply(ctx, args)
    },
    [Opexplicit.isPointInStroke] : (args : any[]) => {
      return (ctx as any).isPointInStroke.apply(ctx, args)
    },
    [Opexplicit.measureText] : (args : any[]) => {
      return ctx.measureText.apply(ctx, args).width
    },
    [Opexplicit.putImageData] : (args : any[]) => {
      ctx.putImageData.apply(ctx, args)
    },
    [Opexplicit.quadraticCurveTo] : (args : any[]) => {
      ctx.quadraticCurveTo.apply(ctx, args)
    },
    [Opexplicit.rect] : (args : any[]) => {
      ctx.rect.apply(ctx, args)
    },
    [Opexplicit.restore] : (args : any[]) => {
      ctx.restore()
    },
    [Opexplicit.rotate] : (args : any[]) => {
      ctx.rotate.apply(ctx, args)
    },
    [Opexplicit.save] : (args : any[]) => {
      ctx.save()
    },
    [Opexplicit.scale] : (args : any[]) => {
      ctx.scale.apply(ctx, args)
    },
    [Opexplicit.setLineDash] : (args : any[]) => {
      ctx.setLineDash(args)
    },
    [Opexplicit.setTransform] : (args : any[]) => {
      ctx.setTransform.apply(ctx, args)
    },
    [Opexplicit.strokeRect] : (args : any[]) => {
      ctx.strokeRect.apply(ctx, args)
    },
    [Opexplicit.strokeText] : (args : any[]) => {
      ctx.strokeText.apply(ctx, args)
    },
    [Opexplicit.transform] : (args : any[]) => {
      ctx.transform.apply(ctx, args)
    },
    [Opexplicit.translate] : (args : any[]) => {
      ctx.translate.apply(ctx, args)
    },


    // ===== canvas 2D properties =====

    [Opexplicit.canvas] : (args : any[]) => {
      return ctx.canvas
    },
    [Opexplicit.globalAlpha] : (args : any[]) => {
      ctx.globalAlpha = args[0]
    },
    [Opexplicit.globalCompositeOperation] : (args : any[]) => {
      ctx.globalCompositeOperation = args[0]
    },
    [Opexplicit.lineCap] : (args : any[]) => {
      ctx.lineCap = args[0]
    },
    [Opexplicit.lineDashOffset] : (args : any[]) => {
      ctx.lineDashOffset = args[0]
    },
    [Opexplicit.lineJoin] : (args : any[]) => {
      ctx.lineJoin = args[0]
    },
    [Opexplicit.lineWidth] : (args : any[]) => {
      ctx.lineWidth = args[0]
    },
    [Opexplicit.miterLimit] : (args : any[]) => {
      ctx.miterLimit = args[0]
    },
    [Opexplicit.shadowBlur] : (args : any[]) => {
      ctx.shadowBlur = args[0]
    },
    [Opexplicit.shadowColor] : (args : any[]) => {
      ctx.shadowColor = args[0]
    },
    [Opexplicit.shadowOffsetX] : (args : any[]) => {
      ctx.shadowOffsetX = args[0]
    },
    [Opexplicit.shadowOffsetY] : (args : any[]) => {
      ctx.shadowOffsetY = args[0]
    },
    [Opexplicit.strokeStyle] : (args : any[]) => {
      ctx.strokeStyle = args[0]
    },
    [Opexplicit.textAlign] : (args : any[]) => {
      ctx.textAlign = args[0]
    },
    [Opexplicit.textBaseline] : (args : any[]) => {
      ctx.textBaseline = args[0]
    },
    [Opexplicit.font] : (args : any[]) => {
      ctx.font = args[0]
    },
    [Opexplicit.fillStyle] : (args : any[]) => {
      ctx.fillStyle = args[0]
    }


  }
}


export class Runtime {
  ctx : CanvasRenderingContext2D

  OpexplicitExecMap : {[index : number] : (args : any[], env : any) => number | string | undefined}

  preloaded : boolean

  text_stack : string[]
  bytecodes : Uint8Array
  debug_mode : boolean

  constructor(ctx : CanvasRenderingContext2D) {
    this.ctx = ctx
    this.text_stack = []
    this.OpexplicitExecMap = OpexplicitExecMapCreater(this.ctx)
  }

  interpret(bytecodes : Uint8Array, env : any = {}) {
    console.time('interpret')

    if (this.bytecodes !== bytecodes) {
      this.bytecodes = bytecodes
      this.text_stack = []
    }

    let stack : (string | number)[] = []
    let stack_scopeindex : number[] = []

    let var_stack : (string | number)[] = []
    let varstack_callindex : number[] = []

    let func_stack : Function[] = []

    let pc = 0

    let specificDispatcher = {

      [Opexplicit.scope] : () => {

        const elem = stack.pop()
        if (elem !== undefined)
          var_stack.push(elem)

        stack_scopeindex.push(stack.length)

        pc += 1

      },

      [Opexplicit.get] : () => {

        const var_index = bytecodes[pc + 1]
        stack.push(var_stack[var_index])

        pc += 2

      },

      [Opimplicit.localfget] : () => {

        const var_index = bytecodes[pc + 1]
        stack.push(var_stack[varstack_callindex[varstack_callindex.length - 1] + var_index])

        pc += 2

      },

      [Opimplicit.sweep] : () => {

        // keep the last result
        const last_ssi = stack_scopeindex.pop()
        if (last_ssi !== undefined) {
          let len_diff = stack.length - last_ssi
          if (len_diff > 0) {
            const last = stack.pop()
            len_diff--
            while (len_diff--) stack.pop()
            stack.push(last as number)
          }
        }

        var_stack.pop()
        pc += 1

      },

      [Opimplicit.sweepn] : () => {

        // move the last result behind jump pc address
        const last_ssi = stack_scopeindex.pop()
        if (last_ssi !== undefined) {
          let len_diff = stack.length - last_ssi
          if (len_diff > 0) {
            const last = stack.pop()
            len_diff--

            while(len_diff--) stack.pop()

            const _n = stack.pop()
            const _pc = stack.pop()

            if (last !== undefined)
              stack.push(last)

            stack.push(_pc as number)
            stack.push(_n as number)
          }
        }

        let sweep_count = stack.pop() as number
        while (sweep_count--)
          var_stack.pop()

        varstack_callindex.pop() // return to previous call stack index
        pc += 1

      },

      [Opexplicit.func] : () => {

        const offset = new Uint32Array(new Uint8Array([
          bytecodes[pc + 1],
          bytecodes[pc + 2],
          bytecodes[pc + 3],
          bytecodes[pc + 4]
        ]).buffer)[0]

        let arg_len = bytecodes[pc + 5]
        const jitcompiler = new JITCompiler({
          bytecodes: new Uint8Array(bytecodes.buffer.slice(pc + 6, pc + 5 + offset)),
          pc: 0,
          base_var_count: 0,
          total_var_count: arg_len,
          text_stack: this.text_stack,
          env: env
        })
        const func_args = [jitcompiler.compile()]

        while (arg_len--)
          func_args.unshift('args_' + arg_len)

        func_stack.push(Function.apply(null, func_args))

        if (this.debug_mode)
          console.log(func_stack[func_stack.length - 1].toString())

        stack.push(func_stack.length - 1)

        // ========= interpret without JIT ============
        // stack.push(pc + 5)
        pc += 5 + offset

      },

      [Opimplicit.jump] : () => {

        pc = stack.pop() as number

      },

      [Opimplicit.jumpoffset] : () => {

        pc += 1
        pc += stack.pop() as number

      },

      [Opexplicit.if] : () => {

        const condition = stack.pop()
        if (condition) {

          pc += 5

        } else {

          uint32[0] = bytecodes[pc + 1] + (bytecodes[pc + 2] << 8) + (bytecodes[pc + 3] << 16) + (bytecodes[pc + 4] << 24)
          pc += uint32[0] + 1

        }

      }

    }

    while (pc < bytecodes.length) {
      const code = bytecodes[pc]

      if (code in specificDispatcher) {

        specificDispatcher[code]()

      }

      // ================================
      // above is specific Opcode handler

      else if (code in OpdataConvertMap) {

        // handling data construction

        const [value, length] = OpdataConvertMap[code](bytecodes, pc + 1, this.text_stack)
        stack.push(value)
        pc += length + 1

      } else if (code in OpexplicitSimpleExecMap) {

        const y = stack.pop()
        const x = stack.pop()
        const result = OpexplicitSimpleExecMap[code](x, y)
        if (result !== undefined)
          stack.push(result)

        pc += 1

      } else if (code in this.OpexplicitExecMap) {

        // ===== calc arg length in stack =====
        let arg_len = bytecodes[pc + 1]
        let start_index = stack.length - arg_len
        if (start_index < 0) {
          arg_len += start_index
          start_index = 0
        }
        const arg : (string | number)[] = stack.splice(start_index, arg_len)

        // ===== execuation ======

        // ============ with JIT compiler ==================

        if (code === Opexplicit.apply) {

          const func_index = arg.shift() as number

          const result = func_stack[func_index].apply({
            env: env,
            vs: var_stack,
            fs: func_stack,
            ctx: this.ctx
          }, arg)
          if (result !== undefined)
            stack.push(result)

          pc += 2

          // =========== interpret without JIT ===============
          // const func_pc = arg.shift() as number
          // const arg_len = bytecodes[func_pc]

          // stack.push(pc + 2)
          // stack.push(arg_len)

          // pc = func_pc + 1

          // stack_scopeindex.push(stack.length)
          // varstack_callindex.push(var_stack.length)

          // var_stack.push.apply(var_stack, arg.slice(0, arg_len))

        } else {

          const result = this.OpexplicitExecMap[code](arg, env)
          if (result !== undefined)
            stack.push(result)

          pc += 2

        }

      } else if (code === Opimplicit.textstack) {

        const offset = new Uint32Array(bytecodes.slice(pc + 1, pc + 5).buffer)[0]

        if (!this.text_stack.length) {

          let str_offset = 5

          while (str_offset - 1 < offset) {
            // use the Opdata.sot to decode textstack
            const [str, length] = OpdataConvertMap[Opdata.sot](bytecodes, pc + str_offset)
            this.text_stack.push(str as string)
            str_offset += length
          }

        }

        pc += offset + 1

      }

      // ====================
      // all other codes left

      else {

        pc += 1

      }
    }

    console.timeEnd('interpret')
  }


}
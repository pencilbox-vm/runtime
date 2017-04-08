import { Opdata, Opimplicit, Opexplicit, EOT } from "./definition"
import { OpdataConvertMap, OpexplicitSimpleExecMap } from "./runtime"

const uint16 = new Uint16Array(1)
const uint32 = new Uint32Array(1)

class JITCompiler {
  bytecodes : Uint8Array
  pc : number
  text_stack : string[]
  stack: string[] = []
  env: any
  base_var_count : number
  total_var_count : number

  constructor(params : {bytecodes : Uint8Array, pc : number, base_var_count: number, total_var_count : number, text_stack : string[], env : any}) {
    this.bytecodes = params.bytecodes
    this.pc = params.pc
    this.base_var_count = params.base_var_count
    this.total_var_count = params.total_var_count
    this.text_stack = params.text_stack
    this.env = params.env
  }

  simpleDispatcher = {

    // ===== mathematical operations =====

    [Opexplicit.add] : (a : any, b : any) => {
      return `(${a}+${b})`
    },
    [Opexplicit.sub] : (a : any, b : any) => {
      return `(${a}-${b})`
    },
    [Opexplicit.mul] : (a : any, b : any) => {
      return `(${a}*${b})`
    },
    [Opexplicit.div] : (a : any, b : any) => {
      return `(${a}/${b})`
    },
    [Opexplicit.mod] : (a : any, b : any) => {
      return `(${a}%${b})`
    },

    // ===== boolean operations =====

    [Opexplicit.eq] : (a : any, b : any) => {
      return ` +(${a}===${b})`
    },
    [Opexplicit.gt] : (a : any, b : any) => {
      return ` +(${a}>${b})`
    },
    [Opexplicit.ge] : (a : any, b : any) => {
      return ` +(${a}>=${b})`
    },
    [Opexplicit.lt] : (a : any, b : any) => {
      return ` +(${a}<${b})`
    },
    [Opexplicit.le] : (a : any, b : any) => {
      return ` +(${a}<=${b})`
    }

  }

  generalDispatcher = {
    [Opexplicit.apply] : (args : any[]) => {

      const func_pc = args.shift() as number

      let instr = `(${func_pc} instanceof Function?${func_pc}:this.fs[${func_pc}]).call(this,`

      args.forEach((item, index) => {
        instr += (index ? ',' : '') + item
      })

      return instr + ')'
    },
    [Opexplicit.print] : (args : any[]) => {
      return `console.log.apply(null, [${args}])`
    },
    [Opexplicit.envGet] : (args : any[], env : any) => {
      return `this.env[${args.join(`][`)}]`
    },
    [Opexplicit.envSet] : (args : any[], env : any) => {
      return `this.env[${args[0]}] = ${args[1]}`
    },
    [Opexplicit.list] : (args : any[]) => {
      return `[${args}]`
    },
    [Opexplicit.index] : (args : any[]) => {
      return `${args[0]}[${args[1]}]`
    },
    [Opexplicit.pop] : (args : any[]) => {
      return `${args[0]}.pop()`
    },
    [Opexplicit.push] : (args : any[]) => {
      return `${args[0]}.push(${args[1]})`
    },
    [Opexplicit.shift] : (args : any[]) => {
      return `${args[0]}.shift()`
    },
    [Opexplicit.unshift] : (args : any[]) => {
      return `${args[0]}.unshift(${args[1]})`
    },


    // ===== canvas 2D operations =====

    [Opexplicit.beginPath] : (args : any[]) => {
      return `this.ctx.beginPath()`
    },
    [Opexplicit.closePath] : (args : any[]) => {
      return `this.ctx.closePath()`
    },
    [Opexplicit.clearRect] : (args : any[]) => {
      return `this.ctx.clearRect.apply(this.ctx, [${args}])`
    },
    [Opexplicit.moveTo] : (args : any[]) => {
      return `this.ctx.moveTo.apply(this.ctx, [${args}])`
    },
    [Opexplicit.lineTo] : (args : any[]) => {
      return `this.ctx.lineTo.apply(this.ctx, [${args}])`
    },
    [Opexplicit.arc] : (args : any[]) => {
      return `this.ctx.arc.apply(this.ctx, [${args}])`
    },
    [Opexplicit.arcTo] : (args : any[]) => {
      return `this.ctx.arcTo.apply(this.ctx, [${args}])`
    },
    [Opexplicit.bezierCurveTo] : (args : any[]) => {
      return `this.ctx.bezierCurveTo.apply(this.ctx, [${args}])`
    },
    [Opexplicit.clip] : (args : any[]) => {
      return `this.ctx.clip.apply(this.ctx, [${args}])`
    },
    [Opexplicit.createImageData] : (args : any[]) => {
      return `this.ctx.createImageData.apply(this.ctx, [${args}])`
    },
    [Opexplicit.createLinearGradient] : (args : any[]) => {
      return `this.ctx.createLinearGradient.apply(this.ctx, [${args}])`
    },
    [Opexplicit.addColorStop] : (args : any[]) => {
      return args.shift() + `.addColorStop(${args[0]}, ${args[1]})`
    },
    [Opexplicit.createPattern] : (args : any[]) => {
      return `this.ctx.createPattern.apply(this.ctx, [${args}])`
    },
    [Opexplicit.createRadialGradient] : (args : any[]) => {
      return `this.ctx.createRadialGradient.apply(this.ctx, [${args}])`
    },
    [Opexplicit.drawImage] : (args : any[]) => {
      return `this.ctx.drawImage.apply(this.ctx, [${args}])`
    },
    [Opexplicit.ellipse] : (args : any[]) => {
      return `this.ctx.ellipse.apply(this.ctx, [${args}])`
    },
    [Opexplicit.fill] : (args : any[]) => {
      return `this.ctx.fill.apply(this.ctx, [${args}])`
    },
    [Opexplicit.fillRect] : (args : any[]) => {
      return `this.ctx.fillRect.apply(this.ctx, [${args}])`
    },
    [Opexplicit.fillText] : (args : any[]) => {
      return `this.ctx.fillText.apply(this.ctx, [${args}])`
    },
    [Opexplicit.getImageData] : (args : any[]) => {
      return `this.ctx.getImageData.apply(this.ctx, [${args}])`
    },
    [Opexplicit.getLineDash] : (args : any[]) => {
      return `this.ctx.getLineDash.apply(this.ctx, [${args}])`
    },
    [Opexplicit.isPointInPath] : (args : any[]) => {
      return `this.ctx.isPointInPath.apply(this.ctx, [${args}])`
    },
    [Opexplicit.isPointInStroke] : (args : any[]) => {
      return `this.ctx.isPointInStroke.apply(this.ctx, [${args}])`
    },
    [Opexplicit.measureText] : (args : any[]) => {
      return `this.ctx.measureText.apply(this.ctx, [${args}]).width`
    },
    [Opexplicit.putImageData] : (args : any[]) => {
      return `this.ctx.putImageData.apply(this.ctx, [${args}])`
    },
    [Opexplicit.quadraticCurveTo] : (args : any[]) => {
      return `this.ctx.quadraticCurveTo.apply(this.ctx, [${args}])`
    },
    [Opexplicit.rect] : (args : any[]) => {
      return `this.ctx.rect.apply(this.ctx, [${args}])`
    },
    [Opexplicit.restore] : (args : any[]) => {
      return `this.ctx.restore()`
    },
    [Opexplicit.rotate] : (args : any[]) => {
      return `this.ctx.rotate.apply(this.ctx, [${args}])`
    },
    [Opexplicit.save] : (args : any[]) => {
      return `this.ctx.save()`
    },
    [Opexplicit.scale] : (args : any[]) => {
      return `this.ctx.scale.apply(this.ctx, [${args}])`
    },
    [Opexplicit.setLineDash] : (args : any[]) => {
      return `this.ctx.setLineDash([${args}])`
    },
    [Opexplicit.setTransform] : (args : any[]) => {
      return `this.ctx.setTransform.apply(this.ctx, [${args}])`
    },
    [Opexplicit.stroke] : (args : any[]) => {
      return `this.ctx.stroke.apply(this.ctx, [${args}])`
    },
    [Opexplicit.strokeRect] : (args : any[]) => {
      return `this.ctx.strokeRect.apply(this.ctx, [${args}])`
    },
    [Opexplicit.strokeText] : (args : any[]) => {
      return `this.ctx.strokeText.apply(this.ctx, [${args}])`
    },
    [Opexplicit.transform] : (args : any[]) => {
      return `this.ctx.transform.apply(this.ctx, [${args}])`
    },
    [Opexplicit.translate] : (args : any[]) => {
      return `this.ctx.translate.apply(this.ctx, [${args}])`
    },

    // ===== canvas 2D properties =====

    [Opexplicit.canvas] : (args : any[]) => {
      return `this.ctx.canvas`
    },
    [Opexplicit.globalAlpha] : (args : any[]) => {
      return `this.ctx.globalAlpha = ${args[0]}`
    },
    [Opexplicit.globalCompositeOperation] : (args : any[]) => {
      return `this.ctx.globalCompositeOperation = ${args[0]}`
    },
    [Opexplicit.lineCap] : (args : any[]) => {
      return `this.ctx.lineCap = ${args[0]}`
    },
    [Opexplicit.lineDashOffset] : (args : any[]) => {
      return `this.ctx.lineDashOffset = ${args[0]}`
    },
    [Opexplicit.lineJoin] : (args : any[]) => {
      return `this.ctx.lineJoin = ${args[0]}`
    },
    [Opexplicit.lineWidth] : (args : any[]) => {
      return `this.ctx.lineWidth = ${args[0]}`
    },
    [Opexplicit.miterLimit] : (args : any[]) => {
      return `this.ctx.miterLimit = ${args[0]}`
    },
    [Opexplicit.shadowBlur] : (args : any[]) => {
      return `this.ctx.shadowBlur = ${args[0]}`
    },
    [Opexplicit.shadowColor] : (args : any[]) => {
      return `this.ctx.shadowColor = ${args[0]}`
    },
    [Opexplicit.shadowOffsetX] : (args : any[]) => {
      return `this.ctx.shadowOffsetX = ${args[0]}`
    },
    [Opexplicit.shadowOffsetY] : (args : any[]) => {
      return `this.ctx.shadowOffsetY = ${args[0]}`
    },
    [Opexplicit.strokeStyle] : (args : any[]) => {
      return `this.ctx.strokeStyle = ${args[0]}`
    },
    [Opexplicit.textAlign] : (args : any[]) => {
      return `this.ctx.textAlign = ${args[0]}`
    },
    [Opexplicit.textBaseline] : (args : any[]) => {
      return `this.ctx.textBaseline = ${args[0]}`
    },
    [Opexplicit.font] : (args : any[]) => {
      return `this.ctx.font = ${args[0]}`
    },
    [Opexplicit.fillStyle] : (args : any[]) => {
      return `this.ctx.fillStyle = ${args[0]}`
    }

  }

  spDispatcher = {
    [Opimplicit.sweep] : () => {

      this.pc += 1
      return true

    },
    [Opexplicit.scope] : () => {

      this.stack.push(`var args_${this.total_var_count}=${this.stack.pop()}`)
      this.total_var_count += 1
      this.pc += 1
      return true

    },
    [Opimplicit.localfget] : () => {

      this.stack.push('args_' + (this.base_var_count + this.bytecodes[this.pc + 1]))
      this.pc += 2
      return true

    },
    [Opexplicit.get] : () => {

      this.stack.push('this.vs[' + this.bytecodes[this.pc + 1] + ']')
      this.pc += 2
      return true

    },
    [Opexplicit.if] : () => {

      uint32[0] = this.bytecodes[this.pc + 1] + (this.bytecodes[this.pc + 2] << 8) + (this.bytecodes[this.pc + 3] << 16) + (this.bytecodes[this.pc + 4] << 24)
      const else_branch_offset = uint32[0]

      uint32[0] = this.bytecodes[this.pc + 1 + else_branch_offset - 5] +
        (this.bytecodes[this.pc + 1 + else_branch_offset - 4] << 8) +
        (this.bytecodes[this.pc + 1 + else_branch_offset - 3] << 16) +
        (this.bytecodes[this.pc + 1 + else_branch_offset - 2] << 24)
      const exit_offset = uint32[0]

      const condition = this.stack.pop()

      const t_br_compiler = new JITCompiler({
        bytecodes: this.bytecodes,
        pc: this.pc + 5,
        base_var_count: this.base_var_count,
        total_var_count: this.total_var_count,
        text_stack: this.text_stack,
        env: this.env
      })
      const f_br_compiler = new JITCompiler({
        bytecodes: this.bytecodes.slice(this.pc + 1 + else_branch_offset, this.pc + 1 + else_branch_offset + exit_offset),
        pc: 0,
        base_var_count: this.base_var_count,
        total_var_count: this.total_var_count,
        text_stack: this.text_stack,
        env: this.env
      })

      const true_branch = t_br_compiler.compile(false)
      const false_branch = f_br_compiler.compile(false)

      this.stack.push('(' + condition + '?(' + true_branch + '):(' + false_branch + '))')
      this.pc += 1 + else_branch_offset + exit_offset
      return true

    },
    [Opexplicit.func] : () => {

      const offset = new Uint32Array(new Uint8Array([
        this.bytecodes[this.pc + 1],
        this.bytecodes[this.pc + 2],
        this.bytecodes[this.pc + 3],
        this.bytecodes[this.pc + 4]
      ]).buffer)[0]

      let arg_len = this.bytecodes[this.pc + 5]

      const compiler = new JITCompiler({
        bytecodes: this.bytecodes.slice(this.pc + 6, this.pc + 5 + offset),
        pc: 0,
        base_var_count: this.total_var_count,
        total_var_count: this.total_var_count + arg_len,
        text_stack: this.text_stack,
        env: this.env
      })

      const func_args = []

      while (arg_len--)
        func_args.unshift('args_' + (this.total_var_count + arg_len))

      const func_body = compiler.compile()
      this.stack.push(`function(${func_args}){${func_body}}`)

      this.pc += 5 + offset
      return true

    }

  }

  compile(with_return : boolean = true) {

    while (this.pc < this.bytecodes.length) {
      const code = this.bytecodes[this.pc]

      if (code === Opimplicit.sweepn || code === Opimplicit.jump)

        break

      else if (code === Opimplicit.jumpoffset) {

        this.stack.pop()
        break

      } else if (code in OpdataConvertMap) {

        const [value, length] = OpdataConvertMap[code](this.bytecodes, this.pc + 1, this.text_stack)
        this.stack.push(typeof value === "string" ? `'${value}'` : value.toString())
        this.pc += length + 1

      } else if (code in OpexplicitSimpleExecMap) {

        const y = this.stack.pop()
        const x = this.stack.pop()
        const result = this.simpleDispatcher[code](x, y)
        if (result !== undefined)
          this.stack.push(result)

        this.pc += 1

      } else if (code in this.generalDispatcher) {

        let arg_len = this.bytecodes[this.pc + 1]
        let start_index = this.stack.length - arg_len
        if (start_index < 0) {
          arg_len += start_index
          start_index = 0
        }
        const args : (string | number)[] = this.stack.splice(start_index, arg_len)

        const result = this.generalDispatcher[code](args, this.env)
        if (result !== undefined)
          this.stack.push(result)

        this.pc += 2

      } else if (code in this.spDispatcher) {

        if (!this.spDispatcher[code]())
          break

      }

    }

    if (with_return)
      this.stack[this.stack.length - 1] = 'return ' + this.stack[this.stack.length - 1]

    return this.stack.join(';')

  }
}


export { JITCompiler }
import { Opexplicit, Opdata, Opimplicit, EncodeTerm, ConstructTerm, EOT } from "./definition"
import { OpexplicitSimpleExecMap } from "./runtime"

export class Compiler {
  static ctx : CanvasRenderingContext2D

  codes : ConstructTerm
  Pencil : any = {}

  constructor() {
    this.codes = {t: [Opimplicit.instrs]}

    // generate properties for Pencil drawing method
    for (const property in Opexplicit) {
      const code = Opexplicit[property]

      if (property === "func" ||
          property === "scope") {

        Object.defineProperty(this.Pencil, property, {
          get: () => {
            return (...params : EncodeTerm[]) => {
              return (...args : EncodeTerm[]) => {
                return {t: [code, {t: params}, ...args]}
              }
            }
          }
        })

      } else {

        Object.defineProperty(this.Pencil, property, {
          get: () => {
            return (...args : EncodeTerm[]) => {
              return {t: [code, ...args]}
            }
          }
        })

      }
    }


  }


  def(...ts : EncodeTerm[]) {
    this.codes.t.push.apply(this.codes.t, ts)
  }

  compile() {
    console.time('compile')

    const textstack_bytes : number[] = [Opimplicit.textstack, 0, 0, 0, 0]
    const textstack_map : {[index : string] : number} = {}
    let textstack_index = 0

    const bytecodes : number[] = []
    const walk = (node : EncodeTerm, var_stack : string[], varstack_callindex: number) => {
      if (node === null) return

      if (typeof node === "object") {
        const code = node.t[0] as number

        if (code === Opexplicit.scope) {

          const params_elem = node.t[1] as ConstructTerm
          const params = params_elem.t

          // ========== store the variable ==========
          if (params.length >= 2) {
            var_stack.push(params[0] as string)

            // ===== load value to stack =====
            walk(params[1], var_stack, varstack_callindex)

            // ===== using this code to push the top of stack to var stack =====
            bytecodes.push(code)
          }

          // ===== run scope body =====
          node.t.forEach((item, index) => {
            if (index > 1)
              walk(item, var_stack, varstack_callindex)
          })

          // ===== recover var stack when jumping out of scope =====
          if (params.length >= 2) {
            var_stack.pop()
            bytecodes.push(Opimplicit.sweep)
          }

        } else if (code === Opexplicit.get) {

          const name = node.t[1] as string
          let not_found = true

          for (let l = var_stack.length; l--;) {
            if (name === var_stack[l]) {

              if (l < varstack_callindex) {
                bytecodes.push(code)
                bytecodes.push(l) // the index of var in var stack
              } else {
                bytecodes.push(Opimplicit.localfget)
                bytecodes.push(l - varstack_callindex) // the index of var in var stack
              }

              not_found = false
              break
            }
          }

          if (not_found)
            throw `no variable \`${name}\` in scope`

        } else if (code === Opexplicit.func) {

          bytecodes.push(code)

          // set the length of function body
          bytecodes.push(0)
          bytecodes.push(0)
          bytecodes.push(0)
          bytecodes.push(0)

          const bytecodes_len = bytecodes.length
          const params_elem = node.t[1] as ConstructTerm

          // ========= push variables to var stack ==========
          const params = params_elem.t

          // log the params size
          bytecodes.push(params.length)

          varstack_callindex = var_stack.length

          params.forEach((item : string) => {
            var_stack.push(item)
          })

          // ========= walk through function body ==========
          node.t.forEach((item, index) => {
            if (index > 1)
              walk(item, var_stack, varstack_callindex)
          })

          // ========= jump back to origin pc =============
          bytecodes.push(Opimplicit.sweepn)
          bytecodes.push(Opimplicit.jump)

          // ========= cleanup ==========
          let len = params.length
          while (len--) {
            var_stack.pop()
          }

          // ========= set function body length ============
          const offset_bytes = new Uint8Array(new Uint32Array([bytecodes.length - bytecodes_len]).buffer)
          bytecodes[bytecodes_len - 4] = offset_bytes[0]
          bytecodes[bytecodes_len - 3] = offset_bytes[1]
          bytecodes[bytecodes_len - 2] = offset_bytes[2]
          bytecodes[bytecodes_len - 1] = offset_bytes[3]

        } else if (code === Opexplicit.if) {

          // push condition on stack
          walk(node.t[1], var_stack, varstack_callindex)

          bytecodes.push(code)

          // else branch address
          const else_val_address = bytecodes.length
          bytecodes.push(0)
          bytecodes.push(0)
          bytecodes.push(0)
          bytecodes.push(0)

          // body of branch true
          walk(node.t[2], var_stack, varstack_callindex)

          // exit address
          bytecodes.push(Opdata.uint32)

          const exit_val_address = bytecodes.length
          bytecodes.push(0)
          bytecodes.push(0)
          bytecodes.push(0)
          bytecodes.push(0)

          bytecodes.push(Opimplicit.jumpoffset)

          let offset_bytes = new Uint8Array(new Uint32Array([bytecodes.length - else_val_address]).buffer)
          bytecodes[else_val_address + 0] = offset_bytes[0]
          bytecodes[else_val_address + 1] = offset_bytes[1]
          bytecodes[else_val_address + 2] = offset_bytes[2]
          bytecodes[else_val_address + 3] = offset_bytes[3]

          // body of branch false
          walk(node.t[3], var_stack, varstack_callindex)

          const exit_address_bytes = new Uint8Array(new Uint32Array([bytecodes.length - (exit_val_address + 5)]).buffer)
          bytecodes[exit_val_address + 0] = exit_address_bytes[0]
          bytecodes[exit_val_address + 1] = exit_address_bytes[1]
          bytecodes[exit_val_address + 2] = exit_address_bytes[2]
          bytecodes[exit_val_address + 3] = exit_address_bytes[3]

        } else {

          node.t.forEach((item, index) => {
            if (index)
              walk(item, var_stack, varstack_callindex)
          })

          bytecodes.push(code)

          // codes in OpexplicitSimpleExecMap contains only two params
          // other codes in Opexplicit contains `n` params which is needed to be marked
          if (code in Opexplicit && !(code in OpexplicitSimpleExecMap))
            bytecodes.push(node.t.length - 1)
        }

      }

      if (typeof node === "number") {
        let type : any = []
        if (node % 1 === 0) {
          // is int

          if (node >= 0) {
            if (node <= 255) {
              type = [Uint8Array, Opdata.uint8]
            } else if (node <= 65535) {
              type = [Uint16Array, Opdata.uint16]
            } else if (node <= 4294967295) {
              type = [Uint32Array, Opdata.uint32]
            } else {
              type = [Float64Array, Opdata.float64]
            }
          } else {
            if (node >= -128) {
              type = [Int8Array, Opdata.int8]
            } else if (node >= -32768) {
              type = [Int16Array, Opdata.int16]
            } else if (node >= -2147483648) {
              type = [Int32Array, Opdata.int32]
            } else {
              type = [Float64Array, Opdata.float64]
            }
          }

        } else {
          // is float

          type = [Float32Array, Opdata.float32]
        }

        const bytes = new Uint8Array(new type[0]([node]).buffer)
        bytecodes.push(type[1])
        Array.prototype.forEach.call(bytes, (item : number) => bytecodes.push(item))
      }


      if (typeof node === "string") {
        node = node as string

        bytecodes.push(Opdata.iot)

        if (node in textstack_map) {

          walk(textstack_map[node], var_stack, varstack_callindex)

        } else {

          const char_codes = []
          for (let i = 0; i < node.length; i++) {
            char_codes.push(node.charCodeAt(i))
          }
          const bytes = new Uint8Array(new Uint16Array(char_codes).buffer)
          Array.prototype.forEach.call(bytes, (item : number) => textstack_bytes.push(item))
          textstack_bytes.push(EOT)
          textstack_bytes.push(0)

          textstack_map[node] = textstack_index

          walk(textstack_index, var_stack, varstack_callindex)

          textstack_index += 1

        }

      }

    }

    walk(this.codes, [], Number.MAX_VALUE)

    const offset_bytes = new Uint8Array(new Uint32Array([textstack_bytes.length - 1]).buffer)
    textstack_bytes[1] = offset_bytes[0]
    textstack_bytes[2] = offset_bytes[1]
    textstack_bytes[3] = offset_bytes[2]
    textstack_bytes[4] = offset_bytes[3]

    console.timeEnd('compile')
    return new Uint8Array(textstack_bytes.concat(bytecodes))
  }

}
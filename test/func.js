var PencilBox = require('../build/pencilbox-vm')

const fib_compiler =  new PencilBox.Compiler()
const pencil = fib_compiler.Pencil
const fib_runtime = new PencilBox.Runtime()

fib_compiler.def(
  pencil.scope('fib',
    pencil.func('n')(
      pencil.if(
        pencil.lt(pencil.get('n'), 2),
        pencil.get('n'),
        pencil.add(
          pencil.apply(pencil.get('fib'), pencil.sub(pencil.get('n'), 1)),
          pencil.apply(pencil.get('fib'), pencil.sub(pencil.get('n'), 2))))
    ))(
    pencil.print('fib pencilbox', pencil.apply(pencil.get('fib'), 30))
  )
)

const bytes_fib = fib_compiler.compile()
console.log("bytes_fib", bytes_fib.toString())
console.time('fib pencilbox')
fib_runtime.interpret(bytes_fib)
console.timeEnd('fib pencilbox')

const nest_func_compiler = new PencilBox.Compiler()
const p = nest_func_compiler.Pencil
const nest_func_runtime = new PencilBox.Runtime()

nest_func_compiler.def(
  p.scope('f', p.func('a', 'b')(
    p.scope('f-nest', p.func('x', 'y')(
      p.add(p.get('x'), p.get('y'))
    ))(
      p.apply(p.get('f-nest'), p.get('a'), p.get('b'))
    )
  ))(
    p.print('js eq: ', p.eq(9, p.apply(p.get('f'), 3, 6)))
  )
)

const bytes_nest_func = nest_func_compiler.compile()
nest_func_runtime.interpret(bytes_nest_func)


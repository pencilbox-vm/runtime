# PencilBox

PencilBox is a VM for Web Canvas Plotting.

## What is this repository for

**PencilBox** is a virtual machine running in browser. It provides canvas plotting for other programming languages and platform(C#, Python, etc).

## Environment
Chrome, Firefox, IE9+

## How to build
```npm
npm run build
```

## How to use
You need to build the `pencilbox-vm.js` file before using it.

| target | doc/file to check |
| --- | --- |
| plot graph | [test/basic.html](https://github.com/pencilbox-vm/runtime/blob/master/test/basic.html) |
| using function | [test/func.js](https://github.com/pencilbox-vm/runtime/blob/master/test/func.js) |
| interactive with events | [test/interactive.html](https://github.com/pencilbox-vm/runtime/blob/master/test/interactive.html) |

## Specification
[specification](https://github.com/pencilbox-vm/runtime/blob/master/spec.md)
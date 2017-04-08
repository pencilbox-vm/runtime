// This EncodeTerm represents the stucture of AST
export interface ConstructTerm {
  t: EncodeTerm[]
}
export type EncodeTerm = number | string | ConstructTerm

// The unicode for end of text
export const EOT = 0x03

// Operations for data construction
export enum Opdata {
  sot = 0, // start of classic text: [sot content EOT]
  iot, // index of textstack
  int8,
  uint8,
  int16,
  uint16,
  int32,
  uint32,
  float32,
  float64
}

// Implicit operations which can not be used by users
export enum Opimplicit {
  instrs = 15,
  textstack, // the mark of string stack
  sweep, // sweep top element from var table
  sweepn, // sweep n elements from var table
  jump, // jump to specific pc
  jumpoffset, // jump to offset pc
  localfget // get local funcion params
}

// Explicit operations list
export enum Opexplicit {

  // pencilbox additional operations
  extend = 30,
  scope,
  get,
  func,
  apply,
  print,

  // mathematical operations
  add,
  sub,
  div,
  mul,
  mod,

  // interactive with environment
  envGet,
  envSet,

  // flow control operations
  if,

  // boolen operations
  eq,
  gt,
  ge,
  lt,
  le,

  // data struct constructor
  list,
  index,
  pop,
  push,
  shift,
  unshift,


  // ============ canvas 2d context properties =============
  canvas,
  // currentTransform,
  // direction,
  fillStyle,
  // filter,
  font,
  globalAlpha,
  globalCompositeOperation,
  // imageSmoothingEnabled,
  // imageSmoothingQuality,
  lineCap,
  lineDashOffset,
  lineJoin,
  lineWidth,
  miterLimit,
  shadowBlur,
  shadowColor,
  shadowOffsetX,
  shadowOffsetY,
  strokeStyle,
  textAlign,
  textBaseline,

  // ============= canvas 2d context operations ============
  // addHitRegion,
  arc,
  arcTo,
  // asyncDrawXULElement,
  beginPath,
  bezierCurveTo,
  // clearHitRegions,
  clearRect,
  clip,
  closePath,
  createImageData,
  createLinearGradient,
    addColorStop,
  createPattern,
  createRadialGradient,
  // drawFocusIfNeeded,
  drawImage,
  // drawWidgetAsOnScreen,
  // drawWindow,
  ellipse,
  fill,
  fillRect,
  fillText,
  getImageData,
  getLineDash,
  isPointInPath,
  isPointInStroke,
  lineTo,
  measureText,
  moveTo,
  putImageData,
  quadraticCurveTo,
  rect,
  // removeHitRegion,
  // resetTransform,
  restore,
  rotate,
  save,
  scale,
  // scrollPathIntoView,
  setLineDash,
  setTransform,
  stroke,
  strokeRect,
  strokeText,
  transform,
  translate
}

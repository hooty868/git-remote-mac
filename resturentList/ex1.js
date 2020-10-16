// 複製物件
var obj = { a: 1 }
var copy = Object.assign({}, obj)
console.log(copy)
// output -> { a: 1 }

// 合併物件
var o1 = { a: 1 }
var o2 = { b: 2 }
var o3 = { c: 3 }

var obj = Object.assign(o1, o2, o3);
console.log(obj)
// output -> { a: 1, b: 2, c: 3 }
console.log(o1)
// output -> { a: 1, b: 2, c: 3 }, 目標物件本身也被改變。






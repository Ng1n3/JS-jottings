let sym = Symbol()
console.log(typeof sym);

let genericsymbol = Symbol('foo')
let otherFooSymbol = Symbol('foo');

console.log(genericsymbol == otherFooSymbol);


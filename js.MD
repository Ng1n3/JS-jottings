## Professional JS for webdeveloper 3rd Edition JOTTINGS;
Hoisting is when the interpreter pulls all the declared variable to the top of its scope.
```
function foo() {
console.log(age);
age = 26;
}
foo(); // Undefined

How ECMA script treats the code above

function foo() {
var age;
console.log(age);
age = 26;
}
foo(); // undefined
```
Let is block scoped while var is function scoped. It also doesnt allow for redundant code

```
if (true) {
var name = 'Matt';
console.log(name); // Matt
}
console.log(name); // Matt
if (true) {
let age = 26;
console.log(age); // 26
}
console.log(age);

var name;
var name;
let age;
let age; // SyntaxError; identifier 'age' has already been declared

var name = 'Matt';
console.log(window.name); // 'Matt'
let age = 26;
console.log(window.age); // undefined
```

Const is a little different from let in that;
```
const age = 26;
age = 36; // TypeError: assignment to a constant

// const still disallows redundant declaration
const name = 'Matt';
const name = 'Nicholas'; // SyntaxError
// const is still scoped to blocks
const name = 'Matt';
if (true) {
const name = 'Nicholas';
}
console.log(name); // Matt`

const person = {};
person.name = 'Matt'; // ok
```
### Null Type
The Null type is the second data type that has only one value: the special value null. Logically, a
null value is an empty object pointer, which is why typeof returns "object" when it’s passed a
null value in the following example:
```
let car = null;
console.log(typeof car); // "object"
```

### Number Type
uses the IEEE–754 format to represent both integers and floating-point values. Octal literals are invalid when running in strict mode and will cause the JavaScript engine to throw a syntax error. floating-point values uses twice as much memory as storing integer values, ECMAScript always looks for ways to convert values into integers.

```
let octalNum1 = 070; // octal for 56
let octalNum2 = 079; // invalid octal - interpreted as 79
let octalNum3 = 08; // invalid octal - interpreted as 8
let hexNum1 = 0xA; // hexadecimal for 10
let hexNum2 = 0x1f; // hexadecimal for 31
let floatNum1 = 1.; // missing digit after decimal - interpreted as integer 1
let floatNum2 = 10.0; // whole number - interpreted as integer 10
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false - 10 is a number
console.log(isNaN("10")); // false - can be converted to number 10
console.log(isNaN("blue")); // true - cannot be converted to a number
console.log(isNaN(true)); // false - can be converted to number 1
```

### STRING
Srings are immutable in ECMAScript, meaning that once they are created, their values cannot change. TO change the string held by a variable, the original string must be destroyed and the variable filled with another string containing a new value.


#### convert to a String
```
let age = 11
let ageAsString = age.toString() // "11"
```
```
\n    => New line
\t    => Tab
\b    => Backspace
\r    => carriage return
\f    => Form feed
\\    => backslash
\'    => Used when the string is delineated by single quotes. E.g 'He said, \' hey. \''.
\"    => Used when the string is delineated by double quotes. E.g "he said, \" hey. \"".
```

### SYMBOL
New in ECMAScript 6 is the Symbol data type. Symbols are primitive values, and symbol instances
are unique and immutable. The purpose of a symbol is to be a guaranteed unique identifier for object
properties that does not risk property collision.

```
let genericsymbol = Symbol('foo')
let otherFooSymbol = Symbol('foo');

console.log(genericsymbol == otherFooSymbol); // false
```
Symbol function cannot be used with the new keyword. Should you want to utilize an object wrapper, you can make use of the Object() function
```
let myBoolean = new Boolean();
console.log(typeof myBoolean); // object

let mySymbol = new Symbol()// TYpeError: Symbol is not a constructor

let mySymbol = Symbol();
let mywrappedSymbol = Object(mySymbol);
console.log(typeof mywrappedSymbol) // object
```

#### Using global Symbl Registry
In scenarios where different parts of the runtime would like to share and reuse a symbol instance, it is
possible to create and reuse symbols in a string-keyed global symbol registry.

The global registy require sting keys.

Symbols defined in the global registry are totally distinct from symbols created using Symbol(), even
if they share a description
```
let fooGlobalsymbol = Symbol.for('foo');
let otherFooGlobalSymbol = Symbol.for('foo');
console.log(fooGlobalsymbol === otherFooGlobalSymbol) //true

let emptyGlobalSymbol = Symbol.for();
console.log(emptyGlobalSymbol) // undefined

let localSymbol = Symbol('foo');
let globalSymbol = Symbol.for('foo');
console.log(localSymbol === globalSymbol); // false

// Create global symbol
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s)); // foo
// Create regular symbol
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined
```

#### Using symbols as Properties
```
let s1 = Symbol('foo'),
s2 = Symbol('bar'),
s3 = Symbol('baz'),
s4 = Symbol('qux');
let o = {
[s1]: 'foo val'
};
// Also valid: o[s1] = 'foo val';
console.log(o);
// {Symbol{foo}: foo val}
Object.defineProperty(o, s2, {value: 'bar val'});
console.log(o);
// {Symbol{foo}: foo val, Symbol(bar): bar val}
Object.defineProperties(o, {
[s3]: {value: 'baz val'},
[s4]: {value: 'qux val'}
});
console.log(o);
// {Symbol{foo}: foo val, Symbol(bar): bar val,
// Symbol{baz}: baz val, Symbol(qux): qux val}

let s1 = Symbol('foo'),
s2 = Symbol('bar');
let o = {
[s1]: 'foo val',
[s2]: 'bar val',
baz: 'baz val',
qux: 'qux val'
};

console.log(Object.getOwnPropertySymbols(o));
// [Symbol(foo), Symbol(bar)]
console.log(Object.getOwnPropertyNames(o));
// ["baz", "qux"]
console.log(Object.getOwnPropertyDescriptors(o));
// {baz: {...}, qux: {...}, Symbol(foo): {...}, Symbol(bar): {...}}
console.log(Reflect.ownKeys(o));
// ["baz", "qux", Symbol(foo), Symbol(bar)]
```


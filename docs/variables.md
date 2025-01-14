# Variables
In this article, we'll look at how variables **work**. To see how to define them, see [the Hello Jesus! example](hello-jesus.md).

## Does context matter?
No. If you define a variable inside a module or a lambda, it will be (re)defined at a global level. So make sure to not name your variables the same!

## Variables object
Variables are stored in a JavaScript object (since this interpreter is written in JS). You can get the object after execution by passing `-d` as an option to the CLI tool:
```bash
pray examples/Lambda.pray -d
```
And it will output something like the following:
```js
{
  saved: 1,
  we: [
    54,
    [ 'portrayed', 'represented' ],
    'examples/Modules/Lambda.pray'
  ],
  'our place': [ 185, [ 'sheltered' ], 'examples/Modules/Lambda.pray' ],
  'had been crucified': '3',
  'had been reborn': '5',
  portrayed: '3',
  represented: '5',
  'had been betrayed': 8,
  sheltered: 8
}
```
As you might have noticed, all the variables are either numbers, strings or arrays with some data. We'll get to the arrays later, but for now let's look at how the strings and the numbers work:
- Numbers are either builtin variables or calculation results (see [math](math.md)).
- Strings are either builtin variables or set by the `who` instruction.

## Lambdas
Lambdas are stored like this:
```js
[char: number, args: string[], filename: string]
```
where
- `char` is the character where the lambda code starts,
- `args` is an array with the argument names,
- and `filename` is the name of the file where the lambda is located.
# Lambdas
Lambdas are inline functions that only execute one instruction. In this article, we'll walk through how to create lambdas and how to call them.

# Defining a lambda
You can define a lambda the following way:
```
may we get portrayed and represented while who had been betrayed as one would have thought as one would have portrayed and represented,
```
Here:
- `may` is the start of the lambda definition;
- `we` is the name of the lambda;
- `get` is the name and parameters separator;
- `portrayed`, `represented` are parameters;
- `and` is the parameter separator;
- `while` is the end of parameters;
- `who had been betrayed as one would have thought as one would have portrayed and represented` sets the `had been betrayed` variable to the sum of the arguments.

The equivalent pseudocode would look something like this:
```
fn we(portrayed, represented) {
    return portrayed + represented
}
```

# Calling a lambda
We would call a lambda like this:
```
And who had been crucified as one would have said ,3',
And who had been reborn as one would have said ,5',
And will we have had been crucified and had been reborn peacefully.
```
Here, we set `had been crucified` to `3`, `had been reborn` to `5` and then call `we` with those two as parameters.\
The syntax for calling a lambda is the following:
1. `will` - equivalent to `call` in some languages.
2. `we` - function name.
3. `have` - name end, parameters start.
4. `had been crucified`, `had been reborn` - parameters names (names of varaibles to pass to a function).
5. `and` - parameter separator.
6. `peacefully` - parameter/call end.

# Result
`Modules/Lambda.pray`
```
Holy Sava,
may we get portrayed and represented while who had been betrayed as one would have thought as one would have portrayed and represented,
And may our place get sheltered while talked as one would have sheltered.
Amen.
```
`Lambda.pray`
```
Hail Dominic,
with ,Modules/Lambda.pray',
And who had been crucified as one would have said ,3',
And who had been reborn as one would have said ,5',
And will we have had been crucified and had been reborn peacefully.
And will our place have had been betrayed peacefully.
Amen.
```
Output:
```
8
```
Variables:
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
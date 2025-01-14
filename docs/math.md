# Math
In this article, we'll walk through how numerical [variables](variables.md) are calculated.

# Operators
There are four operators:
- `and` (`+` internally) is addition,
- `nor` (`-` internally) is subtraction,
- `though` (`*` internally) is multiplication,
- `while` (`/` internally) is division.

# Calculation syntax
Consider the following example:
```
who had been crucified as one would have said ,3',
And who had been reborn as one would have said ,5',
And who had been born as one would have said ,2',
And who had been idolized as one would have thought as one would have had been crucified though had been reborn while had been born,
```
(If you don't understand it, see [Hello Jesus!](hello-jesus.md))

Here, we set `had been crucified` to `3`, `had been reborn` to `5` and `had been born` to `2`. Those are stored as strings internally, but that's not that important.\
Then we start the variable declaration as usual (`who had been idolized as one would have`), but then we start the mathematical expression with `thought as one would have` and then alternate between variable names and operators (`had been crucified though had been reborn while had been born` = `(had been crucified * had been reborn) / had been born`).

> Note:\
> There aren't any parentheses to help define the order of the operations, and no operations have any priority. Here, numbers and operators are always processed from left to right.

> Note:\
> Floats are supported.

# Result
```
Hail Kevin,
who had been crucified as one would have said ,3',
And who had been reborn as one would have said ,5',
And who had been born as one would have said ,2',
And who had been idolized as one would have thought as one would have had been crucified though had been reborn while had been born,
And talked as one would have had been idolized.
Amen.
```
Output:
```
7.5
```
Variables:
```js
{
  saved: 1,
  'had been crucified': '3',
  'had been reborn': '5',
  'had been born': '2',
  'had been idolized': 7.5
}
```
# Hello Jesus!

In this article, we'll walk through the process of creating a simple program that will set a variable to some text and print that text.

## Type/name declaration
First of all, we have to define the type and the name of the program. I like naming my programs after [saints](https://www.britannica.com/topic/list-of-saints-2061264), but you're free to name them whatever you want.\
The main file is defined like this:
```
Hail Lucy,
```
...and a [module](modules.md) would be defined like this:
```
Holy Lucy,
```
That is the first line of our code. Here. `Hail`/`Holy` is the type of the file, and `Lucy` is the name, which could be any single word.\
A newline must follow after the file type/name declaration.

## Variable declaration
Now we have to decalre a variable since the print instruction does not support printing from a string directly and only takes a variable name as a parameter. Get used to it - you'll have to use variables a lot since most instructions don't directly accept strings.\
A variable is defined like this:
```
who had forgiven as one would have said ,Hello Jesus!',
```
Let's break it down.
1. `who` is how we start a variable declaration. Just a simple keyword.
2. `had forgiven` is the variable name. You can include spaces in your variable names, that's right! You can name them whatever you want, but by doing so you're ruining the magic of this language - it won't look like a prayer this way anymore.
3. `as one would have` is the separator between the variable name and value. It's equivalent to `=` in other languages.
4. `said` is the string marker. It marks the beggining of a string.
5. `,` marks the beginning of the actual string content. It's not included in the string content. Can also be `'` or `"`.
6. `Hello Jesus!` is the string content. Can include `\\` for backslashes or `\"` for escaped quotes.
7. `'` is the end of the string (also not included in the string itself). Can also be `"`.
8. `,` is not necessary here, but it makes everything prettier.

## Printing
Now the best part! We get the value of the previously declared `had forgiven` variable and print it to the console. We can do it like this:
```
And talked as one would have had forgiven.
```
1. `And` is the newline separator. Unlike in other languages (where `;` is used), it is usually placed on the next line.
2. `talked as one would have` is the print instruction.
3. `had forgiven` is the variable name.
4. `.` is not necessary, but again, makes everything look prettier.

## Program end
```
Amen.
```
marks the end of a program.

## Result
```
Hail Mary,
who had forgiven as one would have said ,Hello Jesus!',
And talked as one would have had forgiven.
Amen.
```
Output:
```
Hello Jesus!
```
Variables:
```js
{ saved: 1, 'had forgiven': 'Hello Jesus!' }
```

> Note:\
> `saved` is a predefined variable always equal to `1`.
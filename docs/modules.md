# Modules

In this article, we'll walk through how to create and import modules in Praylang.

## Creating modules
First of all, you'll have to define a module in a separate file like this:
```
Holy Patrick,
```
Note how we use `Holy` here instead of `Hail`. We can define [variables](variables.md) and [lambdas](lambdas.md) in this file.

## Importing
Now that we have created a module file, we want to import it from our main file or possibly another module. We can do it like this:
```
with ,Modules/Example.pray',
```
This will copy and overwrite all the variables and lambdas from `Modules/Example.pray` to our main file. We can now readd those variables and use them.

> Note:\
> In the future I'll maybe implement imports by names, so it will look like this:
```
with Saint Patrick,
```

## Result
`Modules/Example.pray`
```
Holy Olga,
who had forgiven as one would have said ,Hello Jesus!',
Amen.
```
`Modules.pray`
```
Hail Anne,
with ,Modules/Example.pray',
And talked as one would have had forgiven.
Amen.
```
Output:
```
Hello Jesus!
```
Variables:
```
{ saved: 1, 'had forgiven': 'Hello Jesus!' }
```
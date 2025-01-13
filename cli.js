#!/usr/bin/env node
import { parseArgs } from "util";
import fs from "fs";
import { Prayer } from "./index.js";

const { values, positionals } = parseArgs({ options: {
    help: {
        type: "boolean",
        short: "h"
    },
    debug: {
        type: "boolean",
        short: "d"
    }
}, allowPositionals: true });

if(values.help || (positionals.length == 0)) {
    console.log(`Pray

Usage:
pray [-hd] [FILES...]

Arguments:
-h, --help   Prints this message.
-d, --debug  Turns on debug mode. Right now only prints the variables after execution.

Examples:
pray -h
pray -d examples/HelloJesus.pray`);
    process.exit(0);
}

const runAndPrint = prayer => {
    const [_type, _name, err, out, vars] = prayer.run();
    if(values.debug) console.log(vars);
    process.stderr.write(err);
    process.stdout.write(out);
    process.exit(err ? 1 : 0);
}

const code = fs.readFileSync(positionals[0], "utf-8");
runAndPrint(new Prayer(code, positionals[0]));
import fs from "fs";
import { join, dirname } from "path";

export class Prayer {
    static START_MAIN = "Hail";
    static START_MOD = "Holy";

    static TYPES = ["main", "mod"];

    static NEWLINE = "And";

    static IMPORT = "with";

    static SET_VAR = "who";
    static VALUE = "as one would have".split(" ");

    static LAMBDA = "may";
    static PARAMS = "get";
    static PARAMS_SEP = "and";
    static PARAMS_END = "while";
    static CALL = "will";
    static CALL_PARAMS = "have";
    static CALL_PARAMS_SEP = "and";
    static CALL_PARAMS_END = "peacefully";

    static MATH = "thought as one would have".split(" ");
    static STRING = "said".split(" ");

    static PRINT = "talked";

    static ADD = "and";
    static SUB = "nor";
    static MUL = "though";
    static DIV = "while";
    
    static END = "Amen";
    static END_INSTRUCTION = [Prayer.NEWLINE, Prayer.END];

    static DEFAULT_VARS = {
        "saved": 1
    };

    static STOP = -1;
    static STOPSTR = -2;
    static WORD_END = [" ", "\n"];
    static IGNORE_CHAR = ["\t", "\r", ",", ";", "."];

    static STATE = {
        EXPECT_VALUE: -2,
    };

    /**
     * Constructs the object.
     * 
     * @param {string} code The code
     * @param {string} name The filename
     * @param {number} [start=0] The starting pos
     * @param {object} [vars=Prayer.DEFAULT_VARS] The starting variables
     */
    constructor(code, name = ":inline:", start = 0, vars = Prayer.DEFAULT_VARS) {
        this.vars = { ...vars };
        this.index = start;
        this.inString = false;
        this.string = "";
        this.filename = name;

        this.code = code + "\n"; // CRUTCH
        this.error = "";
        this.output = "";
    }

    parseStringChar() {
        const c = this.code[this.index++];
        if(c == "\"" || c == "'") {
            let escaped = false, i = this.index - 2;
            while(i >= 0 && this.code[i--] == "\\")
                escaped = !escaped;
            if(!escaped) {
                while(Prayer.WORD_END.includes(this.code[this.index++]));
                return Prayer.STOPSTR;
            }
        }
        this.string += c;
    }

    peekWord() {
        // if(this.index !== undefined) console.log(this.index);
        let i = this.index;

        while(Prayer.WORD_END.includes(this.code[i])) i++;

        let str = "";
        while(i < this.code.length && !Prayer.WORD_END.includes(this.code[i])) {
            const c = this.code[i];
            i++;
            if(Prayer.IGNORE_CHAR.includes(c)) continue;
            str += c;
        }
        if(i >= this.code.length) return [str, i];
        while(i < this.code.length && true) {
            const c = Prayer.WORD_END.includes(this.code[i++]);
            if(!Prayer.WORD_END.includes(c)) break;
        };
        return [str, i];
    }

    readWord() {
        const [str, i] = this.peekWord();
        this.index = i;
        // if(str) console.log(str + "!");
        return str;
    }

    readString() {
        this.string = "";
        this.index++;
        this.inString = true;
        while(this.parseStringChar() !== Prayer.STOPSTR);
        return this.string;
    }

    calc() {
        let value = 0, operation = "+", varName = "";
        const exec = () => operation == "+"
            ? value += parseFloat(this.vars[varName])
            : operation == "-"
            ? value -= parseFloat(this.vars[varName])
            : operation == "*"
            ? value *= parseFloat(this.vars[varName])
            : operation == "/"
            ? value /= parseFloat(this.vars[varName])
            : null;
        while(true) {
            const w = this.readWord();
            if(Prayer.END_INSTRUCTION.includes(w)) break;
            else if(w == Prayer.ADD) {
                exec();
                operation = "+";
                varName = "";
            } else if(w == Prayer.SUB) {
                exec();
                operation = "-";
                varName = "";
            } else if(w == Prayer.MUL) {
                exec();
                operation = "*";
                varName = "";
            } else if(w == Prayer.DIV) {
                exec();
                operation = "/";
                varName = "";
            } else {
                varName += `${varName.length == 0 ? "" : " "}${w}`;
            }
        }
        exec();
        return value;
    }

    makeError(name, description) {
        const before = this.code.slice(0, this.index);
        const split = before.split(/\r\n|\r|\n/);
        const lines = split.length + 1;
        const char = split[split.length - 1].length;
        this.error = `${name} error: ${description}\n  at ${this.filename}:${lines}:${char}\n`;
    }

    parseWord() {
        if(this.index == this.code.length) return Prayer.STOP;
        const str = this.readWord();
        if(str == Prayer.NEWLINE)
            this.parseWord();
        else if(str == Prayer.SET_VAR) {
            let word = "", varName = [];
            while((word = this.readWord()) != Prayer.VALUE[0])
                varName.push(word);
            varName = varName.join(" ");
            let index = 1;
            while(true) {
                word = this.peekWord()[0];
                if(word != Prayer.VALUE[index++]) break;
                this.readWord();
            }
            
            let value = "";
            const first = this.readWord();
            if(Prayer.END_INSTRUCTION.includes(first)) return this.vars[varName] = "";
            else if(Prayer.STRING.includes(first)) value = this.readString();
            else if(first == Prayer.MATH[0]) {
                index = 1;
                while(true) {
                    word = this.peekWord()[0];
                    if(word != Prayer.MATH[index++]) break;
                    this.readWord();
                }
                value = this.calc();
            } else {
                value = first;
                let word;
                while(!Prayer.END_INSTRUCTION.includes(word = this.readWord()))
                    value += " " + word;
                value = this.vars[value];
            }
            this.vars[varName] = value;
        } else if(str == Prayer.PRINT) {
            let word;
            let index = 0;
            while((word = this.readWord()) == Prayer.VALUE[index++]);
            let varName = [word];
            while(!Prayer.END_INSTRUCTION.includes(word = this.readWord()))
                varName.push(word);
            varName = varName.join(" ");
            this.output += this.vars[varName] + "\n";
        } else if(str == Prayer.IMPORT) {
            const modName = join(dirname(this.filename), this.readString());
            if(!fs.existsSync(modName)) {
                this.makeError("module", "module not found: " + modName);
                return Prayer.STOP;
            }
            const file = fs.readFileSync(modName, "utf-8");
            const prayer = new Prayer(file, modName);
            const [type, _name, error, out, vars] = prayer.run();
            if(type !== "mod") {
                this.makeError("module", "is not a module: " + modName);
                return Prayer.STOP;
            } else if(error) {
                this.makeError("module", "error in module: " + modName);
                this.error += error;
                return Prayer.STOP;
            }
            this.output += out;
            this.vars = Object.assign(this.vars, vars);
        } else if(str == Prayer.LAMBDA) {
            let lambdaName = [];
            while(true) {
                const part = this.readWord();
                if(part == Prayer.PARAMS) break;
                lambdaName.push(part);
            }
            lambdaName = lambdaName.join(" ");
            let params = [], currentParam = [];
            while(true) {
                const param = this.readWord();
                currentParam.push(param);
                const after = this.peekWord()[0];
                if(after == Prayer.PARAMS_END) {
                    params.push(currentParam.join(" "));
                    this.readWord();
                    break;
                }
                else if(after == Prayer.PARAMS_SEP) {
                    params.push(currentParam.join(" "));
                    currentParam = [];
                    this.readWord();
                }
            }
            this.vars[lambdaName] = [this.index, params, this.filename];
            let word;
            while(!Prayer.END_INSTRUCTION.includes(word = this.readWord()));
        } else if(str == Prayer.CALL) {
            let lambdaName = [];
            // TODO: readUntil function maybe?
            while(true) {
                const part = this.readWord();
                if(part == Prayer.CALL_PARAMS) break;
                lambdaName.push(part);
            }
            lambdaName = lambdaName.join(" ");
            let params = [], currentParam = [];
            while(true) {
                const param = this.readWord();
                currentParam.push(param);
                const after = this.peekWord()[0];
                if(after == Prayer.CALL_PARAMS_END) {
                    params.push(currentParam.join(" "));
                    this.readWord();
                    break;
                }
                else if(after == Prayer.CALL_PARAMS_SEP) {
                    params.push(currentParam.join(" "));
                    currentParam = [];
                    this.readWord();
                }
            }
            const lambda = this.vars[lambdaName];
            params = params.map((x, i) => [lambda[1][i], this.vars[x]]);
            params = Object.fromEntries(params);
            // TODO: cahced read
            const file = fs.readFileSync(lambda[2], "utf-8");
            const prayer = new Prayer(file, lambda[2], lambda[0], params);
            prayer.parseWord();
            if(prayer.error) {
                this.makeError("lambda", "error in lambda: " + lambdaName);
                this.error += error;
                return Prayer.STOP;
            }
            this.output += prayer.output;
            this.vars = Object.assign(this.vars, prayer.vars);
        }
        else if(str == Prayer.END) return Prayer.STOP;
    }

    /**
     * Runs the program.
     * 
     * @returns {[string, string, string, string, object]} The type, the name, the error, the output and the variables
     */
    run() {
        const type = Prayer.TYPES[[Prayer.START_MAIN, Prayer.START_MOD].indexOf(this.readWord())];
        const name = this.readWord();
        // this.readWord();
        // console.log(name, type);

        while(true) {
            if(this.index == this.code.length)
                break;

            if(this.parseWord() === Prayer.STOP)
                break;
        }
        return [type, name, this.error, this.output, this.vars];
    }
}
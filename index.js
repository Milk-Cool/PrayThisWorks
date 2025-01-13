export class Prayer {
    static START_MAIN = "Hail";
    static START_MOD = "Holy";

    static TYPES = ["main", "mod"];

    static NEWLINE = "And";

    static SET_VAR = "who";
    static VALUE = "as one would have".split(" ");

    static MATH = "thought as one would have".split(" ");
    static STRING = "said".split(" ");

    static PRINT = "talked";

    static ADD = "and";
    static SUB = "nor";
    
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
     */
    constructor(code) {
        this.vars = { ...Prayer.DEFAULT_VARS };
        this.index = 0;
        this.inString = false;
        this.string = "";

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
            } else {
                varName += `${varName.length == 0 ? "" : " "}${w}`;
            }
        }
        exec();
        return value;
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
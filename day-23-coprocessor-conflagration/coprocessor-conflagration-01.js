const registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    mulCount: 0,
    i: 0,

    run(input){
        while (this.i < input.length && this.i >= 0){
            const {operationNickname, x, y} = this.parseInstruction(input[this.i]);
            switch(operationNickname){
                case 'set': this.set(x, y);
                            break;
                case 'sub': this.subtract(x, y);
                            break;
                case 'mul': this.multiply(x, y);
                            this.mulCount++;
                            break;
                case 'jnz': this.jump(x, y);
                            continue;
            }
            this.i++;
        }
    },

    parseInstruction(instruction){
        const operationNickname = instruction[0];
        const x = instruction[1];
        const y = instruction[2];
        return {operationNickname, x, y}
    },

    set(register, y){
        const valueOfY = this.getValue(y);
        this[register] = valueOfY;
    },

    subtract(register, y){
        const valueOfY = this.getValue(y);
        this[register] -= valueOfY;
    },

    multiply(register, y){
        const valueOfY = this.getValue(y);
        this[register] *= valueOfY;
    },

    jump(x, y){
        const valueOfX = this.getValue(x);
        const valueOfY = this.getValue(y);
        if (valueOfX !== 0)
            this.i += valueOfY;
        else this.i ++;
    },

    getValue(string){
        return !isNaN(string) ? parseInt(string) : this[string];
    }

};
    
const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((instruction) => instruction.split(' '));

registers.run(input);

console.log(`Multiply was invoked ${registers.mulCount} times.` );
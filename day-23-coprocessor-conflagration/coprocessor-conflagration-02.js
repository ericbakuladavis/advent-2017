const program = {
    registers: {
        a: 1,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0
    },

    i: 0,

    percentComplete: 0,

    run(input){
        while (this.i < input.length && this.i >= 0){

            if (this.i === 19 && this.registers.g !== 0){
                if (this.registers.b % this.registers.d === 0){
                    this.registers.f = 0;
                }
                let num = this.registers.b - this.registers.e
                this.registers.e += num;
                this.registers.g += num;            
            }

            if (this.i === 28){
                let percentComplete = Math.floor((17000 + this.registers.g) / 170)
                if (percentComplete > this.percentComplete){
                    this.percentComplete = percentComplete
                    console.log(`${percentComplete}% complete`);
                }
            }

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
        this.registers[register] = valueOfY;
    },

    subtract(register, y){
        const valueOfY = this.getValue(y);
        this.registers[register] -= valueOfY;
    },

    multiply(register, y){
        const valueOfY = this.getValue(y);
        this.registers[register] *= valueOfY;
    },

    jump(x, y){
        const valueOfX = this.getValue(x);
        const valueOfY = this.getValue(y);
        if (valueOfX !== 0)
            this.i += valueOfY;
        else this.i ++;
    },

    getValue(string){
        return !isNaN(string) ? parseInt(string) : this.registers[string];
    }

};
    
const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((instruction) => instruction.split(' '));

console.time('go');
program.run(input);
console.timeEnd('go');
console.log(program.registers.h);
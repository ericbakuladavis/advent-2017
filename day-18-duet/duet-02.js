class Program {
    constructor (programNumber){
        this.p = programNumber;
        this.a = 0;
        this.b = 0;
        this.f = 0;
        this.i = 0;
        this.name = 'program' + programNumber;
        this.instructionIndex = 0;
        this.sendQueue = [];
        this.sendCount = 0;
        this.status = 'active';
        this.terminate = false;
    }

    followInstructions(input){
        while (this.terminate === false && this.status === 'active'){
            const instruction = input[this.instructionIndex];
            const operationNickname = instruction[0];
            const x = instruction[1];
            const y = instruction[2];
            switch(operationNickname){
                case 'snd': this.send(x);
                            break;
                case 'set': this.set(x, y);
                            break;
                case 'add': this.add(x, y);
                            break;
                case 'mul': this.multiply(x, y);
                            break;
                case 'mod': this.modulo(x, y);
                            break;
                case 'rcv': this.receive(x);
                            break;
                case 'jgz': this.jump(x, y);
                            break;
            }
            if (this.instructionIndex >= input.length || this.instructionIndex < 0){
                this.status = 'finished';
                this.sendQueue = [];
            }
            this.instructionIndex++;
        }
    }

    send(x){
        const valueOfX = this.getValue(x)
        this.sendQueue.push(valueOfX);
        this.sendCount++;
    }
    
    set(register, y){
        const valueOfY = this.getValue(y)
        this[register] = valueOfY;
    }
    
    add(register, y){
        const valueOfY = this.getValue(y)
        this[register] += valueOfY;
    }
    
    multiply(register, y){
        const valueOfY = this.getValue(y);
        this[register] *= valueOfY;
    }
    
    modulo(register, y){
        const valueOfY = this.getValue(y)
        this[register] %= valueOfY;
    }
    
    receive(register){
        if (this.partner.sendQueue.length > 0){
            this[register] = this.partner.sendQueue.shift();
        } else {
            this.instructionIndex--;
            this.status = 'paused';
            if (this.sendQueue.length === 0){
                this.terminate = true;
                this.partner.terminate = true;
            }
        }
    }

    jump(x, y){
        const valueOfX = this.getValue(x);
        const valueOfY = this.getValue(y);
        if (valueOfX > 0)
            this.instructionIndex += (valueOfY - 1);
    }

    getValue(string){
        return !isNaN(string) ? parseInt(string) : this[string];
    }
}

function getSendCountOfProgram1(input){
    const program0 = new Program(0);
    const program1 = new Program(1);
    program0.partner = program1;
    program1.partner = program0;

    while (program0.terminate === false && program1.terminate === false  && !(program0.status === 'finished' && program1.status === 'finished')) {
        if (program0.status !== 'finished'){
            program0.status = 'active';
            program0.followInstructions(input);
        }
        if (program1.status !== 'finished'){
            program1.status = 'active';
            program1.followInstructions(input);
        }
    }
    return program1.sendCount;
}

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((instruction) => instruction.split(' '));

console.log( 'The program sent ' + getSendCountOfProgram1(input) + ' values' ); // 7239
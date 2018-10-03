class Rule {
    constructor(ruleDescription){
        this.write = ruleDescription[1][22];
        this.move = ruleDescription[2][27];
        this.continue = ruleDescription[3][26];
    }
}

class State {
    constructor(stateDescription){
        this.parseState(stateDescription)
    }

    parseState(stateDescription){
        this.parseRule(stateDescription.slice(1, 5));
        this.parseRule(stateDescription.slice(5));
    }

    parseRule(ruleDescription){
        const ruleValue = ruleDescription[0][26];
        this[ruleValue] = new Rule (ruleDescription);
    }
}

const blueprints = {

    states: {},
    tape: {0:0},
    currentStateName: '',
    currentIndex: 0,

    parseInput(input){
        for (let i = 3; i < input.length; i += 10){
            const stateDescription = input.slice(i, i + 9);
            const stateName = stateDescription[0][9];
            this.states[stateName] = new State(stateDescription);
        }
        this.currentStateName = input[0][15];
        const result = input[1].match(/\d+/);
        this.stepsToTake = parseInt(result[0]);
    },

    run(){
        for (let i = 0; i < this.stepsToTake; i++){
            this.takeStep();
            if (i % 1000000 === 0)
                console.log(Math.floor(i * 100 / this.stepsToTake) + '% complete');
        }
    },

    takeStep(){
        const currentState = this.states[this.currentStateName];
        const currentNumCopy = this.currentNum;
        this.currentNum = currentState[this.currentNum].write;
        if (currentState[currentNumCopy].move === 'r'){
            if (this.tape[this.currentIndex + 1] === undefined){
                this.tape[this.currentIndex + 1] = '0';
            }
            this.currentIndex++;
        } else {
            if (this.tape[this.currentIndex - 1] === undefined){
                this.tape[this.currentIndex - 1] = '0';
            }
            this.currentIndex--;
        }
        this.currentStateName = currentState[currentNumCopy].continue;
    },

    get checkSum(){
        let checkSum = 0;
        for (index in this.tape){
            const number = this.tape[index];
            if (number === "1")
                checkSum++
        }
        return checkSum;
    },

    get currentNum(){
        return this.tape[this.currentIndex];
    },

    set currentNum(num){
        this.tape[this.currentIndex] = num;
    }

};

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n');

blueprints.parseInput(input);
blueprints.run();
console.log ('The final checksum is:', blueprints.checkSum);
const packet = {
    collectedLetters: '',
    stepsTaken: 0,

    setMap(input){
        this.map = input;
    },

    setStartPosition(){
        this.row = 0;
        this.column = this.map[this.row].indexOf('|');
        this.direction = 'down';
        this.currentCharacter = '|';
    },

    walkThePath(){
        while (this.currentCharacter !== undefined && this.currentCharacter !== ' '){
            this.takeStep();
            this.setCurrentCharacter();
            if (/[A-Z]/.test(this.currentCharacter)){
                this.collectLetter();
            }
            if (this.currentCharacter === '+')
                this.setNewDirection();
        }
    },

    takeStep(){
        switch(this.direction){
            case 'down':    this.row++;
                            break;
            case 'up':      this.row--;
                            break;
            case 'right':   this.column++;
                            break;
            case 'left':    this.column--;
                            break;
        }
        this.stepsTaken++;
    },

    setCurrentCharacter(){
        this.currentCharacter = this.map[this.row][this.column];
    },

    collectLetter(){
        this.collectedLetters += this.currentCharacter;
    },

    setNewDirection(){
        const row = this.row;
        const column = this.column;
        if (this.isPath(row + 1, column) && this.direction !== 'up'){
            this.direction = 'down';
        } else if (this.isPath(row - 1, column) && this.direction !== 'down'){
            this.direction = 'up';
        } else if (this.isPath(row, column + 1) && this.direction !== 'left'){
            this.direction = 'right';
        } else if (this.isPath(row, column - 1) && this.direction !== 'right'){
            this.direction = 'left';
        }
    },

    isPath(row, column){
            return this.map[row] && this.map[row][column] !== ' ' ? true : false;
    }
}

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n');

packet.setMap(input);
packet.setStartPosition();
packet.walkThePath();
console.log(packet.collectedLetters);
console.log(packet.stepsTaken);
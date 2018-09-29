const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((row) => row.split(''));

const cluster = {

    setMap(input){
        this.map = input;
        this.column = Math.floor(input.length / 2);
        this.row = this.column;
        this.leftMostColumn = 0;
        this.rightMostColumn = input.length - 1;
        this.directionIndex = 0;
        this.directions = ['up', 'right', 'down', 'left'];
        this.infectCount = 0;
    },

    get currentNode(){
        return this.map[this.row][this.column];
    },

    set currentNode(char){
        this.map[this.row][this.column] = char;
    },

    get currentDirection(){
        return this.directions[this.directionIndex];
    },

    turn(){
        switch (this.currentNode){
            case '#':   // turn right
                        this.directionIndex = (this.directionIndex + 1) % 4;
                        break;
            case '.':   // turn left
                        this.directionIndex = (this.directionIndex + 3) % 4;
                        break;
            default: throw 'invalid currentNode';
        }
    },

    cleanOrInfect(){
        switch (this.currentNode){
            case '.':   this.currentNode = '#';
                        this.infectCount++;
                        break;
            case '#':   this.currentNode = '.';
                        break;
            default: throw 'currentNode is invalid';
        }
    },

    move(){
        switch (this.currentDirection){
            case 'up':  if (this.map[this.row - 1] === undefined){
                            this.map[this.row - 1] = [];
                            for (let column = this.leftMostColumn; column <= this.rightMostColumn; column++)
                                this.map[this.row - 1][column] = '.';
                        }
                        this.row--;
                        break;
            case 'down':    if (this.map[this.row + 1] === undefined){
                                this.map[this.row + 1] = [];
                                for (let column = this.leftMostColumn; column <= this.rightMostColumn; column++)
                                    this.map[this.row + 1][column] = '.';  
                            }
                            this.row++;
                            break;
            case 'right':   if (this.map[this.row][this.column + 1] === undefined){
                                for (row in this.map)
                                    this.map[row][this.column + 1] = '.';
                                this.rightMostColumn++;
                            }
                            this.column++;
                            break;
            case 'left':   if (this.map[this.row][this.column - 1] === undefined){
                                for (row in this.map)
                                    this.map[row][this.column - 1] = '.';
                                this.leftMostColumn--;
                            }
                            this.column--;
                            break;                            
        }
    },

    burst(){
        this.turn();
        this.cleanOrInfect();
        this.move();
    },

    go(bursts){
        for (let i = 0; i < bursts; i++)
            this.burst();
    }
}

module.exports = {
    cluster,
    input
}
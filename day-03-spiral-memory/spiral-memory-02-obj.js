const spiral = {

    grid: [[1]],
    x : 0,
    y : 0,
    bottomRow : 0,
    topRow : 0,
    n : 1,
    stepsToTake : 0,
    targetFound : false,

    getNeighbors(direction){
        switch (direction){
            case 'right': return [this.n, this.grid[this.y+1][this.x-1], this.grid[this.y+1][this.x], this.grid[this.y+1][this.x+1]];
            case 'up': return [this.n, this.grid[this.y-1][this.x-1], this.grid[this.y][this.x-1], this.grid[this.y+1][this.x-1]];
            case 'left': return [this.n, this.grid[this.y-1][this.x+1], this.grid[this.y-1][this.x], this.grid[this.y-1][this.x-1]];
            case 'down': return [this.n, this.grid[this.y+1][this.x+1], this.grid[this.y][this.x+1], this.grid[this.y-1][this.x+1]];
        }
    },

    sumOfNeighbors(direction){
        const neighbors = this.getNeighbors(direction);
        return neighbors.reduce((sum, neighbor) => neighbor ? sum + neighbor : sum);
    },

    walk(direction, target){
        let variable;
        let change;
        switch (direction){
            case 'right':   variable = 'x';
                            change = 1;
                            break;
            case 'up':      variable = 'y';
                            change = 1;
                            break;
            case 'left':    variable = 'x';
                            change = -1;
                            break;
            case 'down':    variable = 'y';
                            change = -1;
        }

        for (let i = 0; i < this.stepsToTake; i++){
            
            this[variable] += change;

            this.n = this.sumOfNeighbors(direction);

            if (this.n > target){
                this.targetFound = true;
                break;
            }
            this.grid[this.y][this.x] = this.n;
        }
    },

    addNewRows(rows, variable){
        let change;
        if (variable === 'topRow')
            change = 1;
        if (variable === 'bottomRow')
            change = -1;

        for (let i = 0; i < rows; i++){
            this[variable] += change;
            this.grid[this[variable]] = [];
        }
    },

    reachTarget(target){
        while (this.n < target){

            // add two new top rows and two new bottom rows
            this.addNewRows(2, 'topRow');
            this.addNewRows(2, 'bottomRow');

            // increase stepsToTake
            this.stepsToTake++;

            // walk right        
            this.walk('right', target);
            if (this.targetFound)
                return this.n;

            // walk up
            this.walk('up', target);
            if (this.targetFound)
                return this.n;

            // increase stepsToTake
            this.stepsToTake++;

            // walk left
            this.walk('left', target);
            if (this.targetFound)
                return this.n;

            // walk down
            this.walk('down', target);
            if (this.targetFound)
                return this.n;
        }
    }
}

console.log(spiral.reachTarget(325489)); // 325489 => 330785
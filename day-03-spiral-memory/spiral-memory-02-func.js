function reachTarget(target){

    function getNeighbors(direction){
        switch (direction){
            case 'x++': return [n, grid[y+1][x-1], grid[y+1][x], grid[y+1][x+1]];
            case 'y++': return [n, grid[y-1][x-1], grid[y][x-1], grid[y+1][x-1]];
            case 'x--': return [n, grid[y-1][x+1], grid[y-1][x], grid[y-1][x-1]];
            case 'y--': return [n, grid[y+1][x+1], grid[y][x+1], grid[y-1][x+1]];
        }
    }

    function sumOfNeighbors(direction){
        const neighbors = getNeighbors(direction);
        return neighbors.reduce((sum, neighbor) => neighbor ? sum + neighbor : sum);
    }

    function walk(direction){
        for (let i = 0; i < stepsToTake; i++){
            
            // step in the direction
            eval(direction);

            // set the new n to the sum of it's neighbors
            n = sumOfNeighbors(direction);

            // check target
            if (n > target){
                targetFound = true;
                break;
            }

            // haven't hit target yet
            // add n to the grid and keep going
            grid[y][x] = n;
        }
    }
    
    function addNewBottomRows(rows){
        for (let i = 0; i < rows; i++){
            bottomRow--;
            grid[bottomRow] = [];
        }
    }

    function addNewTopRows(rows){
        for (let i = 0; i < rows; i++){
            topRow++;
            grid[topRow] = [];
        }
    }

    const grid = [[1]];
    let x = 0,
        y = 0,
        bottomRow = 0,
        topRow = 0,
        n = 1,
        stepsToTake = 0,
        targetFound = false;

    // make the spiral in the grid
    while (n < target){

        // add two new top rows and two new bottom rows
        addNewTopRows(2);
        addNewBottomRows(2);

        // increase stepsToTake
        stepsToTake++;

        // walk right        
        walk('x++');
        if (targetFound)
            return n;

        // walk up
        walk('y++');
        if (targetFound)
            return n;

        // increase stepsToTake
        stepsToTake++;

        // walk left
        walk('x--');
        if (targetFound)
            return n;

       // walk down
       walk('y--');
       if (targetFound)
            return n;
    }
}

console.log(reachTarget(325489)); // 325489 => 330785
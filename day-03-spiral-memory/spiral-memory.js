// here's the spiral from the prompt:
// 17  16  15  14  13
// 18   5   4   3  12
// 19   6   1   2  11
// 20   7   8   9  10
// 21  22  23---> ...


// here's the spiral where each number is how many steps are needed to reach the center:
// 4   3   2   3   4 
// 3   2   1   2   3 
// 2   1   0   1   2 
// 3   2   1   2   3 
// 4   3   2---> ...

// if we un-coil and extend that, it looks like this:

// 0, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 3, 2, 3, 4, 5, 4, 3, 4, 5, 6..

// that series follows a pattern.
// here's a visual/auditory representation of the pattern (extended further still): https://goo.gl/isxjFZ

// the series oscilates between a ceiling and a floor.
// both the ceiling and the floor grow, but the ceiling grows faster.

// this getSteps produces that pattern and returns stepsToReachCenter as soon as curNum equals targetNum.
// curNum represents a number from the spiral in the prompt.
// stepsToReachCenter represents how many steps it takes to reach the center, starting at curNum.

function getSteps (targetNum){ 
    let curNum = 1,
        floor = 1,
        ceiling = 2,
        hitFloorCount = 0,
        stepsToReachCenter = 0;
    while  (stepsToReachCenter <= targetNum){
        while (stepsToReachCenter < ceiling){
            if (curNum === targetNum)
                return stepsToReachCenter;
            curNum++;
            stepsToReachCenter++;
        }
        while (stepsToReachCenter > floor){
            if (curNum === targetNum)
                return stepsToReachCenter;
            curNum++;
            stepsToReachCenter--;
        }
        hitFloorCount++;
        if (hitFloorCount === 3){
            ceiling++;
            floor++;
        }
        if (hitFloorCount === 4){
            ceiling++;
            hitFloorCount = 0;
        }
    }
}

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

console.log(getSteps(325489)); // 325489 => 552
console.log(reachTarget(325489)); // 325489 => 330785
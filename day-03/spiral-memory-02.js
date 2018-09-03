
function findValueInSpiral(target){
    
    function addTopRow(){
        topRow++;
        grid[topRow] = [];
    }
    
    function addBottomRow(){
        bottomRow--;
        grid[bottomRow] = [];
    }
    
    function isGreaterThanTarget(n){
        return n > target ? true : false;
    }

    function sumOfNeighbors(neighbors){
        return neighbors.reduce((sum, neighbor) => neighbor ? sum + neighbor : sum);
    }

    let grid = [[1]];
    let x = 0;
    let y = 0;
    let bottomRow = 0;
    let topRow = 0;
    let n = 1;
    let stepCount = 0


    // make the spiral in the grid
    while (n < 325489){

        // add two new top rows and two new bottom rows
        addTopRow();
        addTopRow();
        addBottomRow();
        addBottomRow();

        // increase stepcount
        stepCount++;

        // walk right
        for (let i = 0; i < stepCount; i++){
            
            // step right
            x++;

            // get neighbors of the current square (n from the previous step is one of them)
            const upperLeftNeighbor = grid[y+1][x-1];
            const upperNeighbor = grid[y+1][x];
            const upperRightNeighbor = grid[y+1][x+1];
            const neighbors = [n, upperLeftNeighbor, upperNeighbor, upperRightNeighbor]

            // set the new n to the sum of it's neighbors
            n = sumOfNeighbors(neighbors);

            // check target
            if (isGreaterThanTarget(n))
                return n;
            
            // haven't hit target yet
            // add n to the grid and keep going
            grid[y][x] = n;
        }

        // walk up
        for (let i = 0; i < stepCount; i++){
            
            // step up
            y++;

            // get neighbors of the current square (n from the previous step is one of them)
            const lowerLeftNeighbor = grid[y-1][x-1];
            const leftNeighbor = grid[y][x-1];
            const upperLeftNeighbor = grid[y+1][x-1];
            const neighbors = [n, lowerLeftNeighbor, leftNeighbor, upperLeftNeighbor]

            // set the new n to the sum of it's neighbors
            n = sumOfNeighbors(neighbors);

            // check target
            if (isGreaterThanTarget(n))
                return n;
            
            // haven't hit target yet
            // add n to the grid and keep going    
            grid[y][x] = n;
        }

        // increase stepcount
        stepCount++;

        // walk left
        for (let i = 0; i < stepCount; i++){
            
            // step left
            x--;

            // get neighbors of the current square (n from the previous step is one of them)
            const lowerRightNeighbor = grid[y-1][x+1];
            const lowerNeighbor = grid[y-1][x];
            const lowerLeftNeighbor = grid[y-1][x-1];   
            const neighbors = [n, lowerRightNeighbor, lowerNeighbor, lowerLeftNeighbor]

            // set the new n to the sum of it's neighbors
            n = sumOfNeighbors(neighbors);

            // check target
            if (isGreaterThanTarget(n))
                return n;
            
            // haven't hit target yet
            // add n to the grid and keep going    
            grid[y][x] = n;
        }

        // walk down
        for (let i = 0; i < stepCount; i++){
            
            // step down
            y--;

            // get neighbors of the current square (n from the previous step is one of them)
            const upperRightNeighbor = grid[y+1][x+1];
            const rightNeighbor = grid[y][x+1];
            const lowerRightNeighbor = grid[y-1][x+1];       
            const neighbors = [n, upperRightNeighbor, rightNeighbor, lowerRightNeighbor]

            // set the new n to the sum of it's neighbors
            n = sumOfNeighbors(neighbors);
            
            // check target
            if (isGreaterThanTarget(n))
                return n;
            
            // haven't hit target yet
            // add n to the grid and keep going
            grid[y][x] = n;
        }

    }

}

console.log(findValueInSpiral(325489));
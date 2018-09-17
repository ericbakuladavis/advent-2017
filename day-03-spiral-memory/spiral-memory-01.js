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

// this function produces that pattern and returns stepsToReachCenter as soon as curNum equals targetNum.
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

console.log(getSteps(325489)); // 325489 => 552
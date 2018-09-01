// foo
// each n in steps represents the number of steps required for a number in the spiral
// steps[0] contains the number of steps required by 1 (which is 0)
// steps[1] contains the number of steps required by 2 (which is 1)
// steps[2] contains the number of steps required by 3 (which is 2)
// steps[3] contains the number of steps required by 4 (which is 1)
// n will osciate between a high number and a low number
// both the high and the low will grow, but the high will grow faster

function getSteps (target){ 
  let steps = [],
      low = 1,
      high = 2,
      counter = 0,
      n = 0;
  while  (n <= target){
    while (n < high){
      steps.push(n);
      if (steps.length === target)
        return n;
      n++;
    }
    while (n > low){
      steps.push(n);
      if (steps.length === target)
        return n;
      n--;
    }
    counter++;
    if (counter === 3){
      high++;
      low++;
    }
    if (counter === 4){
      high++;
      counter = 0;
    }
  }
}
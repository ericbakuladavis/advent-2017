function inverseCaptcha1(input){
    let sum = 0;
    for (let i = 0; i < input.length; i++){
        const curNum = input[i];
        let nextNum = input[i + 1];
    
        if (i === input.length - 1)
            nextNum = input[0];
    
        if (curNum === nextNum)
            sum += curNum;
    }
    return sum;
}

function inverseCaptcha2(input){
    let sum = 0;
    for (let i = 0; i < input.length / 2; i++){
        const curNum = input[i];
        const nextNumIndex = i + input.length / 2;
        const nextNum = input[nextNumIndex];

        if (curNum === nextNum)
            sum += curNum + nextNum;
    }
    return sum;
}
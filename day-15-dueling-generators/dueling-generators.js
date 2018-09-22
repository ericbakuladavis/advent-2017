function genAv2(a){
    do {a = (a * 16807) % 2147483647;} while (a % 4 !== 0);
    return a;
}

function genBv2(b){
    do {b = (b * 48271) % 2147483647;} while (b % 8 !== 0);
    return b;
}

function genAv1(a){
    return (a * 16807) % 2147483647;
}

function genBv1(b){
    return (b * 48271) % 2147483647;
}

function judge(genA, genB, a, b, n){
    let matches = 0;
    for (let i = 0; i < n; i++){
        a = genA(a);
        aBin = a.toString(2);
        a16 = aBin.slice(aBin.length - 16).padStart(16, '0');

        b = genB(b);
        bBin = b.toString(2);
        b16 = bBin.slice(bBin.length - 16).padStart(16, '0');

        if (a16 === b16)
            matches++;
    }
    return matches;
}

console.log(judge(genAv1, genBv1, 703, 516, 40000000)); // 594
console.log(judge(genAv2, genBv2, 703, 516, 5000000)); // 328
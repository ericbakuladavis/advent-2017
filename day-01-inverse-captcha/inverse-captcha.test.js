const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('').map((str) => parseInt(str));
const funcs = require('./inverse-captcha');

it('Got right answer', () =>{
    expect(funcs.inverseCaptcha1(input)).toBe(1223);
})

it('Got right answer', () =>{
    expect(funcs.inverseCaptcha2(input)).toBe(1284);
})
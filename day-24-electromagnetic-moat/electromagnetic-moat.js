const bridges = {

    list: [],
    highStrength: 0,
    highLength: 0,
    strengthOfLongestBridge: 0,

    build(input, bridge = [], num){
        for (let i = 0; i < input.length; i++){
            let component = input[i];
            if (component.includes(num)){
                if (component[0] !== num){
                    component.reverse()
                }
                let bridgeCopy = bridge.slice();
                let inputCopy = input.slice();
                bridgeCopy.push(component)
                inputCopy.splice(i, 1);
                numCopy = component[1];
                this.build(inputCopy, bridgeCopy, numCopy);
            }
        }
        if (bridge.length > 0)
            this.list.push(bridge);
    },

    setHighStrength(){
        this.list.forEach((bridge) => {
            const strength = this.getStrength(bridge);
            if (strength > this.highStrength)
                this.highStrength = strength;
        });
    },

    getStrength(bridge){
        let strength = 0;
        bridge.forEach((component) => {
            strength += component[0] + component[1] ;
        });
        return strength;
    },

    setHighLength(){
        this.list.forEach((bridge) => {
            if (bridge.length > this.highLength)
                this.highLength = bridge.length;
        }); 
    },

    setStrengthOfLongestBridge(){
        let highStrength = 0;
        this.list.forEach((bridge) => {
            if (bridge.length === this.highLength){
                let strength = this.getStrength(bridge);
                if (strength > highStrength)
                    highStrength = strength;
            }
        });
        this.strengthOfLongestBridge = highStrength;
    }
};



const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((component) => component   .match(/\d+/g)
                                                .map((string) => parseInt(string)));

bridges.build(input, [], 0);
bridges.setHighStrength();
bridges.setHighLength();
bridges.setStrengthOfLongestBridge();

console.log('The strength of the strongest bridge is:', bridges.highStrength);
console.log('The strength of the longest bridge is:', bridges.strengthOfLongestBridge);
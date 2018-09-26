class Particle {
    constructor(p, v, a){
        this.p = p;
        this.v = v;
        this.a = a;
        this.setDistance();
    }

    setDistance(){
        this.distance = Math.abs(this.p.x) + Math.abs(this.p.y) + Math.abs(this.p.z);
    }
}    

const swarm = {

    particles: {},

    populate(input){
        input.forEach((line, particle) => {
            const {p, v, a} = this.parseLine(line);
            this.particles[particle] = new Particle(p, v, a);
        });
    },

    parseLine(line){
        const numbersAsStrings = line.match(/(-?\d+)/g);
        const numbers = numbersAsStrings.map((string) => parseInt(string));
        const p = this.assignCoordinates( ...numbers.slice(0,3) );
        const v = this.assignCoordinates( ...numbers.slice(3,6) );
        const a = this.assignCoordinates( ...numbers.slice(6) );
        return {p, v, a}
    },

    assignCoordinates(x, y, z){
        return {x, y, z};
    },

    simulate(cycles, collisions = false){
        for (let i = 0; i < cycles; i++){
            if (collisions === true)
                this.resolveCollisions();
            this.advance();
        }
    },

    resolveCollisions(){
        const allPositions = {};
        for (particle in this.particles){
            const position = JSON.stringify(this.particles[particle].p);
            if (allPositions.hasOwnProperty(position)){
                const collisionPartner = allPositions[position];
                delete this.particles[particle];
                delete this.particles[collisionPartner];
            }
            else
                allPositions[position] = particle;
        }
    },

    advance(){
        for (particle in this.particles){
            const particleData = this.particles[particle];
            particleData.v.x += particleData.a.x;
            particleData.v.y += particleData.a.y;
            particleData.v.z += particleData.a.z;
            particleData.p.x += particleData.v.x;
            particleData.p.y += particleData.v.y;
            particleData.p.z += particleData.v.z;
            particleData.setDistance();
        }
    },
    
    getClosestParticle(){
        let minDistance = Infinity;
        let closestParticle = undefined;
        for (particle in this.particles){
            const particleDistance = this.particles[particle].distance
            if (particleDistance < minDistance){
                minDistance = particleDistance;
                closestParticle = particle;
            }
        }
        return closestParticle;
    }
}

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n');

swarm.populate(input);
swarm.simulate(5000);
console.log ( 'Closest particle after awhile:', swarm.getClosestParticle() );

swarm.populate(input);
console.log('Working...');
swarm.simulate(5000, true);
console.log ( 'Uncollided particles after awhile:', Object.keys(swarm.particles).length );
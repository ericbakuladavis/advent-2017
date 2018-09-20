function getGroupList(village, program, groupID, groupList = new Set()){
    if (!groupList.has(program)){
        groupList.add(program);
        village[program].groupID = groupID;
        village[program].partners.forEach((partner) => {
            getGroupList(village, partner, groupID, groupList);
        });
        return groupList;
    }
}

function populateVillage(input){
    let village = {};
    input.forEach((line) => {
        let programs = line.match(/\d+/g)
        let program = programs[0];
        let partners = programs.slice(1)
        village[program] = {partners};
    });
    return village;
}

function getGroupsInVillage(input){
    let village = populateVillage(input);
    let groupsInVillage = 0;
    for (program in village){
        if (!village[program].groupID){
            getGroupList(village, program, program);
            groupsInVillage++;
        }
    }
    return groupsInVillage;
}

function getProgramsInGroup(input, program){
    let village = populateVillage(input);
    let groupList = getGroupList(village, program, program);
    return groupList.size;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

console.log(`There are ${getProgramsInGroup(input, "0")} programs in the group`);
console.log(`There are ${getGroupsInVillage(input)} groups in the village`);
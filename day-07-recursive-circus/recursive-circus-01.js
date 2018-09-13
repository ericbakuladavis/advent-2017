function addChildrenToTree(tree, node, indices, line){
    node.children = {};
    let childrenNames = line.slice(indices.dash).split(', ');
    childrenNames.forEach((childName) => {
        if (!tree[childName])
            tree[childName] = {};
        node.children[childName] = tree[childName];
        tree[childName].parent = node;
    });
}

function getCharacterIndices(line){
    let indices = {};
    for (let i = 0; !indices.dash && i < line.length ; i++){
        let character = line[i];
        switch (character) {
            case '(':   indices.openParenthesis = i;
                        break;
            case ')':   indices.closedParenthesis = i;
                        break;
            case '-':   indices.dash = i + 3;
                        break;
        }
    }
    return indices;
}

function addNodeAndChildrenToTree(tree, line){
    let indices = getCharacterIndices(line);
    let nodeName = line.slice(0, indices.openParenthesis - 1);
    if (!tree[nodeName])
        tree[nodeName] = {};
    let node = tree[nodeName];
    node.weight = parseInt(line.slice(indices.openParenthesis + 1, indices.closedParenthesis));
    if (indices.dash){
        addChildrenToTree(tree, node, indices, line); 
    }
}

function makeTree(input){
    let tree = {};
    input.forEach((line) => {
        addNodeAndChildrenToTree(tree, line);
    });
    return tree;
}

function findBottomName(input){
    let tree = makeTree(input);
    for (nodeName in tree){
        if (!tree[nodeName].parent)
            return nodeName;
    }
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

console.log(findBottomName(input));
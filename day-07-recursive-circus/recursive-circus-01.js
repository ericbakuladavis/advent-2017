function addChildrenToTree(tree, nodeName, indices, line){
    let node = tree[nodeName];
    node.children = {};
    let childrenNames = line.slice(indices.dash).split(', ');
    childrenNames.forEach((childName) => {
        if (!tree[childName])
            tree[childName] = {};
        node.children[childName] = tree[childName];
        tree[childName].parent = node;
    });
}

function getIndices(line){
    let indices = {};
    for (let i = 0; !indices.dash && i < line.length ; i++){
        let char = line[i];
        switch (char) {
            case '(':   indices.openParens = i;
                        break;
            case ')':   indices.closeParens = i;
                        break;
            case '-':   indices.dash = i + 3;
                        break;
        }

    }
    return indices;
}

function addNodeAndChildrenToTree(tree, line){
    let indices = getIndices(line);
    let nodeName = line.slice(0, indices.openParens - 1);
    if (!tree[nodeName])
        tree[nodeName] = {};
    let node = tree[nodeName];
    node.weight = parseInt(line.slice(indices.openParens + 1, indices.closeParens));
    if (indices.dash){
        addChildrenToTree(tree, nodeName, indices, line); 
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
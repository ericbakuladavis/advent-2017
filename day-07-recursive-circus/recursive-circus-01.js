function addChildrenToTree(tree, name, children){
    children.forEach((child) => {
        if (!tree.hasOwnProperty(child))
            tree[child] = {};
        tree[child].parent = name;
    });
}

function getIndices(line){
    let openParensIndex;
    let closeParensIndex;
    let listIndex;
    for (let i = 0; !listIndex && i < line.length ; i++){
        let char = line[i];
        switch (char) {
            case '(':   openParensIndex = i;
                        break;
            case ')':   closeParensIndex = i;
                        break;
            case '-':   listIndex = i + 3;
                        break;
        }
    }
    let indices = {};
    indices.openParens = openParensIndex;
    indices.closeParens = closeParensIndex;
    indices.list = listIndex;
    return indices;
}

function makeNode(line){
    let indices = getIndices(line);
    let name = line.slice(0, indices.openParens - 1);
    let weight = parseInt(line.slice(indices.openParens + 1, indices.closeParens));
    // Is there a better way to create this set?
    let children;
    if (indices.list){
        children = new Set(line.slice(indices.list).split(', '));
    }
    let node = {};
    node.name = name;
    node.weight = weight;
    node.children = children;
    return node;
}

function addNodeAndChildrenToTree(tree, line){
    let node = makeNode(line);
    if (!tree.hasOwnProperty(node.name))
        tree[node.name] = {};
    tree[node.name].weight = node.weight;
    tree[node.name].children = node.children;
    if (node.children)
        addChildrenToTree(tree, node.name, node.children);
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
        if (!tree[nodeName].hasOwnProperty('parent'))
            return nodeName;
    }
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

console.log(findBottomName(input));
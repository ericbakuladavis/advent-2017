function findBalancedChildTotalWeight(tree, node){
    let seen = new Set();
    let balancedChildTotalWeight;
    for (child of node.children){
        let childTotalWeight = tree[child].totalWeight;
        if (seen.has(childTotalWeight)){
            balancedChildTotalWeight = childTotalWeight;
            break;
        } else {
            seen.add(childTotalWeight);
        }
    }
    return balancedChildTotalWeight;    
}

function findUnbalancedChild(tree, node){
    let balancedChildTotalWeight = findBalancedChildTotalWeight(tree, node);
    for (child of node.children){
        let childTotalWeight = tree[child].totalWeight;
        if (childTotalWeight !== balancedChildTotalWeight)
            return tree[child];
    }
    return undefined;
}

function findHighestUnbalancedNode(tree, node){
    let unbalancedChild = findUnbalancedChild(tree, node);
    if (unbalancedChild === undefined)
        return node;
    return findHighestUnbalancedNode(tree, unbalancedChild);
}

function getTotalWeight(tree, node){
    if (!node.children){
        node.totalWeight = node.weight;
        return node.totalWeight;
    }
    let weightOfChildren = 0;
    node.children.forEach((child) => {
        weightOfChildren += getTotalWeight(tree, tree[child]);
    });
    node.totalWeight = weightOfChildren + node.weight;
    return node.totalWeight;
}

function findBottomName(tree){
    for (nodeName in tree){
        if (!tree[nodeName].hasOwnProperty('parent'))
            return nodeName;
    }
}

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

function getTargetWeightOfHighestUnbalancedNode(input){
    let tree = makeTree(input);
    let bottomName = findBottomName(tree);

    //This gets the total weight of the tree, which we don't need.
    //But it also sets a totalWeight for each node, which we want.
    getTotalWeight(tree, tree[bottomName]);
    
    let highestUnbalancedNode = findHighestUnbalancedNode(tree, tree[bottomName]);
    let highestUnbalancedNodeParent = tree[highestUnbalancedNode.parent];
    let highestUnbalancedNodeSiblingTotalWeight = findBalancedChildTotalWeight(tree, highestUnbalancedNodeParent);
    let difference = highestUnbalancedNode.totalWeight - highestUnbalancedNodeSiblingTotalWeight;
    return highestUnbalancedNode.weight - difference;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

console.log(getTargetWeightOfHighestUnbalancedNode(input));
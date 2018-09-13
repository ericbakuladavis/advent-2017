function findBalancedChildTotalWeight(node){
    let seen = new Set();
    let balancedChildTotalWeight;
    for (childName in node.children){
        let childTotalWeight = node.children[childName].totalWeight;
        if (seen.has(childTotalWeight)){
            balancedChildTotalWeight = childTotalWeight;
            break;
        } else {
            seen.add(childTotalWeight);
        }
    }
    return balancedChildTotalWeight;    
}

function findUnbalancedChild(node){
    let balancedChildTotalWeight = findBalancedChildTotalWeight(node);
    for (childName in node.children){
        let childTotalWeight = node.children[childName].totalWeight;
        if (childTotalWeight !== balancedChildTotalWeight)
            return node.children[childName];
    }
    return undefined;
}

function findHighestUnbalancedNode(node){
    let unbalancedChild = findUnbalancedChild(node);
    if (unbalancedChild === undefined)
        return node;
    return findHighestUnbalancedNode(unbalancedChild);
}

function getTotalWeight(tree, node){
    if (!node.children){
        node.totalWeight = node.weight;
        return node.totalWeight;
    }
    let totalWeightOfChildren = 0;
    for (childName in node.children){
        totalWeightOfChildren += getTotalWeight(tree, tree[childName]);
    }
    node.totalWeight = totalWeightOfChildren + node.weight;
    return node.totalWeight;
}

function findBottomName(tree){
    for (nodeName in tree){
        if (!tree[nodeName].parent)
            return nodeName;
    }
}

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

function getTargetWeightOfHighestUnbalancedNode(input){
    let tree = makeTree(input);
    let bottomName = findBottomName(tree);
    let bottom = tree[bottomName];

    //This gets the total weight of the tree, which we don't need.
    //But it also sets a totalWeight for each node, which we want.
    getTotalWeight(tree, bottom);

    let highestUnbalancedNode = findHighestUnbalancedNode(bottom);
    let highestUnbalancedNodeSiblingTotalWeight = findBalancedChildTotalWeight(highestUnbalancedNode.parent);
    let difference = highestUnbalancedNode.totalWeight - highestUnbalancedNodeSiblingTotalWeight;

    return highestUnbalancedNode.weight - difference;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

console.log(getTargetWeightOfHighestUnbalancedNode(input));
console.log("Day 6 ---"); // lots of snow outside. 6th of Dec. lets code. 
var fs = require("fs");

function getText(inputFile) {
    return new Promise(function (resolve, reject) {
        fs.readFile(inputFile, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    });
}

function splitStringIntoParentAndChild(input) {
    return {
        id: input.split(")")[1],
        parentId: input.split(")")[0]
    };
}

function findDepthLevelAndAllParents(el, indx, arr, depth, allParents) {
    var parentIndx = arr.findIndex(ar => ar.id === el.parentId);
    if (parentIndx !== -1) {
        depth = depth + 1;
        allParents.push(arr[parentIndx].parentId + "");
        return findDepthLevelAndAllParents(arr[parentIndx], indx, arr, depth, allParents); // recursively calculate the depth level. 
    }
    return {
        depth: depth,
        allParents: allParents
    };
}

function findCommonParents(id1, id2, arr) {
    return arr.find(el => el.id === id1).allParents.filter(el => arr.find(el => el.id === id2).allParents.includes(el));
}

function getDepth(arr, id) {
    return arr.find((el) => el.id === id).depth
}

function findDistance(id1, id2, arr) {
    var depthofSP = getDepth(arr, findCommonParents(id1, id2, arr)[0]);
    var depthof1 = getDepth(arr, id1);
    var depthof2 = getDepth(arr, id2);
    return (depthof1 - depthofSP - 1) + (depthof2 - depthofSP - 1);
}

function getOrbits(textInput) {
    var arrayOfInput = textInput.split(/\r?\n/g);
    arrayOfInput = arrayOfInput.map(splitStringIntoParentAndChild);
    var totalDepth = 0;
    arrayOfInput.forEach((el, indx, arr) => {
        var depth = 1;
        var output = findDepthLevelAndAllParents(el, indx, arr, depth, [el.parentId]);
        arr[indx]["allParents"] = output.allParents;
        el.depth = output.depth;
        totalDepth = totalDepth + output.depth;
    });
    console.log("Part 1 answer -->  " + totalDepth);

    var totalDistance = findDistance("YOU", "SAN", arrayOfInput);
    console.log("Part 2 answer -->  " + totalDistance);
}

function run(inputFile) {
    getText(inputFile).then(getOrbits);
}

run('input6.txt');
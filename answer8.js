console.log("Day 8 ---");
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

function countCharInArray(arr, chr) {
    var countOfchr = 0;
    arr.forEach((l) => {
        if (l === chr) {
            countOfchr++;
        }
    });
    return countOfchr;
}

function finalVal(val1, val2) {
   return val1 === "2" ? val2 : val1;
}

function compareAndOutput(arr1, arr2) {
    var outputArray = [];
    arr1.forEach((val1, indx1) => {
        outputArray[indx1] = finalVal(val1, arr2[indx1]);
    });
    return outputArray;
}

function getLayers(wp, wt, data) {
    var strData = data.toString();
    var layers = [];
    var layer = [];
    var total = wp * wt;
    for (indx = 0; indx < strData.length; indx++) {
        var layerIndex = Math.floor(indx / total);
        var remIndex = indx % total;
        layer[remIndex] = strData[indx];
        if (remIndex === (total - 1)) {
            layers[layerIndex] = layer.slice(0);
        }
    }
    var formmattedLayers = layers.map(lyr => {
        var output = [];
        var innerRow = [];
        lyr.forEach((el, indxe) => {
            var rowIndex = Math.floor(indxe / wp);
            var remrowIndex = indxe % wp;
            innerRow[remrowIndex] = el;
            if (remrowIndex === (wp - 1)) {
                output[rowIndex] = innerRow.slice(0);
            }
        })
        return output;
    })
    var finalRow = [];
    for (var ij = 0; ij < wt; ij++) {
        formmattedLayers.forEach((fl, findx) => {
            var fr = fl[ij];
            if (!finalRow[ij]) {
                finalRow[ij] = fr;
            } else {
                finalRow[ij] = compareAndOutput(finalRow[ij], fr);
            }
        });
    }
    var calLayers = layers.map((ly) => {
        return {
            count: countCharInArray(ly, "0"),
            arr: ly
        }
    });
    calLayers.sort((a, b) => {
        return a.count - b.count
    })
    var output = countCharInArray(calLayers[0].arr, "1") * countCharInArray(calLayers[0].arr, "2");
    console.log("Part 1 output ---> " + output);
    console.log("Part 2 output --->");
    finalRow.forEach(fr => {
        console.log(fr.toString().replace(/0/gi, " ").replace(/,/gi, " ").replace(/1/gi, "*"));
    })
}

function run(inputFile, a, b) {
    getText(inputFile).then(getLayers.bind(this, a, b));
}
run('input8.txt', 25, 6);
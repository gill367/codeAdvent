function findOpstringValue(inpstring, inpIndex) {
  return inpstring.length >= inpIndex ? inpstring[inpstring.length - inpIndex] : "0"
}

function readVal(iarr, indx) {
  if (indx >= iarr.length) {
    for (var jk = iarr.length; jk <= indx; jk++) {
      iarr[jk] = 0;
    }
  }
  return iarr[indx];
}

function checkAndextendMemory(iarr, indx) {
  if (indx >= iarr.length) {
    for (var jk = iarr.length; jk <= indx; jk++) {
      iarr[jk] = 0;
    }
  }
}

function writeVal(iarr, indx, val) {
  checkAndextendMemory(iarr, indx);
  iarr[indx] = val;
}

function setIndex(iarr, val) {
  checkAndextendMemory(iarr, val);
  var inextIndex = val;
  return inextIndex;
}

function getPositionAsperMode(inpOpString, arr1, indxPara, index2, rB) {
  var mode = findOpstringValue(inpOpString, index2 + 2);
  if (mode === "0") {
    return readVal(arr1, indxPara);
  } else if (mode === "1") {
    return indxPara;
  } else if (mode === "2") {
    return readVal(arr1, indxPara) + rB;
  }
  throw new Error("not correct input");
}


function valueAsPerMode(inpOpString, arr1, indxPara, index2, rB) {
  var mode = findOpstringValue(inpOpString, index2 + 2);
  if (mode === "0") {
    return readVal(arr1, readVal(arr1, indxPara));
  } else if (mode === "1") {
    return readVal(arr1, indxPara);
  } else if (mode === "2") {
    return readVal(arr1, (readVal(arr1, indxPara) + rB));
  }
  throw new Error("not correct input");
}


function processInput(arr, indx, inp, realtiveBase) {
  var stop = false;
  var output;
  var opString = arr[indx].toString();
  var nextIndex = indx;
  var para1 = arr[indx + 1];


  var opcodeString = findOpstringValue(opString, 2) + "" + findOpstringValue(opString, 1);;
  if (opcodeString === '01') {
    writeVal(arr, getPositionAsperMode(opString, arr, indx + 3, 3, realtiveBase),
      valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase) + valueAsPerMode(opString, arr, indx + 2, 2, realtiveBase));

    nextIndex = setIndex(arr, indx + 4);
    //   nextIndex = indx + 4;

  } else if (opcodeString === '02') {
    writeVal(arr, getPositionAsperMode(opString, arr, indx + 3, 3, realtiveBase),
      valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase) * valueAsPerMode(opString, arr, indx + 2, 2, realtiveBase));

    nextIndex = setIndex(arr, indx + 4);

  } else if (opcodeString === '03') {
    var mode = findOpstringValue(opString, 3);
    var writeIndx = mode === "2" ? para1 + realtiveBase : para1;
    writeVal(arr, writeIndx, inp);

    nextIndex = setIndex(arr, indx + 2);

  } else if (opcodeString === '04') {
    output = valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase);
    nextIndex = setIndex(arr, indx + 2);
  } else if (opcodeString === '05') {
    var value = valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase);
    if (value !== 0) {
      nextIndex = valueAsPerMode(opString, arr, indx + 2, 2, realtiveBase);
    } else {
      nextIndex = setIndex(arr, indx + 3);
    }
  } else if (opcodeString === '06') {
    var value = valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase);
    if (value === 0) {
      nextIndex = valueAsPerMode(opString, arr, indx + 2, 2, realtiveBase);
    } else {
      nextIndex = setIndex(arr, indx + 3);
    }
  } else if (opcodeString === '07') {
    var value1 = valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase);
    var value2 = valueAsPerMode(opString, arr, indx + 2, 2, realtiveBase);
    if (value1 < value2) {
      //      nextIndex = setIndex(arr, readVal(arr, indx + 3));
      writeVal(arr, getPositionAsperMode(opString, arr, indx + 3, 3, realtiveBase), 1);
      // arr[arr[indx + 3]] = 1;
    } else {
      writeVal(arr, getPositionAsperMode(opString, arr, indx + 3, 3, realtiveBase), 0);
    }

    nextIndex = setIndex(arr, indx + 4);

  } else if (opcodeString === '08') {
    var value1 = valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase);
    var value2 = valueAsPerMode(opString, arr, indx + 2, 2, realtiveBase);
    if (value1 === value2) {
      writeVal(arr, getPositionAsperMode(opString, arr, indx + 3, 3, realtiveBase), 1);
    } else {
      writeVal(arr, getPositionAsperMode(opString, arr, indx + 3, 3, realtiveBase), 0);
    }

    nextIndex = setIndex(arr, indx + 4);

  } else if (opcodeString === '09') {
    realtiveBase = realtiveBase + valueAsPerMode(opString, arr, indx + 1, 1, realtiveBase);
    nextIndex = setIndex(arr, indx + 2);
  } else if (opcodeString === '99') {
    stop = true;
  } else {
    console.log("Error op" + opcodeString + "- indx" + indx + "- opcodeString" + opcodeString +
      " - input " + inp);
    console.log("error");
    throw (new Error("invalid input"));
    // stop = true;
  }

  return {
    result: arr,
    stop: stop,
    output: output,
    nextIndex: nextIndex,
    realtiveBase: realtiveBase
  };
}

function findNextPointandDirection(currentPoint, currentdirection, inputset) {
  var nextPoint = currentPoint;
  var x = currentPoint.x;
  var y = currentPoint.y;
  var input = inputset[1];
  var color = inputset[0];
  var nextDirection = currentdirection;

  switch (currentdirection) {
    case 'UP':
      nextPoint = {
        
        x: input === 0 ? x - 1 : input === 1 ? x + 1 : 0,
        y: y
      };
      nextDirection = input === 0 ? 'LEFT' : input === 1 ? 'RIGHT' : 'UNKNOWN';
      break;

    case 'LEFT':
      nextPoint = {
        x: x,
        y: input === 0 ? y + 1 : input === 1 ? y - 1 : 0
       
      };
      nextDirection = input === 0 ? 'DOWN' : input === 1 ? 'UP': 'UNKNOWN';
      break;


    case 'RIGHT':
      nextPoint = {
        x:x,
        y: input === 0 ? y - 1 : input === 1 ? y + 1 : 0
      
      };
      nextDirection = input === 0 ? 'UP' : input === 1 ? 'DOWN' : 'UNKNOWN';
      break;

    case 'DOWN':
      nextPoint = {
        x: input === 0 ? x + 1 : input === 1 ? x - 1 : 0,
        y: y
      };
      nextDirection = input === 0 ? 'RIGHT' : input === 1 ? 'LEFT' : 'UNKNOWN';
      break;
  }

  return {
    nextPoint: nextPoint,
    nextDirection: nextDirection
  }


}

function getInputFromPoint(point, coll, initialinput){
   var pointExist =  [];
   pointExist = coll.filter((cel) => {
     return cel.x === point.x && cel.y === point.y;
   });
  var existingColor = !pointExist || !pointExist.length ? initialinput : pointExist[pointExist.length - 1].color;
  //var pointExist;
  return {existingColor: existingColor,pointExist: pointExist};
}

function runProgram(day2Input_changed, input, relBaseInput, startPoint, startDirection) {
  var initialinput = input;
  var arr = day2Input_changed;
  var outputSet = [];
  var outputPair = [];
  var relBase = relBaseInput ? relBaseInput : 0;
  var pointsCovered = [];
  var nextPoint = startPoint;
  var indxCount = 0;
  var nextDirection = startDirection;
  try {
    for (var indx = 0; arr && !!arr.length && indx < arr.length;) {
     
      output = processInput(arr, indx, input, relBase);
      arr = output.result;
      relBase = output.realtiveBase;
      if (output.output === 0 || !!output.output) {
        outputSet.push(output.output);
        outputPair.push(output.output);
        if(outputPair.length === 2) {
          var coloredPoint = nextPoint;
          coloredPoint["color"] = outputPair[0];
          coloredPoint["direction"] = nextDirection;
          coloredPoint["nextOutput"] = outputPair.toString();
       //   coloredPoint["totalOutputs"] = outputSet.length;
          indxCount = indxCount + 1;
          coloredPoint["indx"] = indxCount;
        var npd = findNextPointandDirection(nextPoint, nextDirection, outputPair);
        nextPoint = npd.nextPoint;
        nextDirection = npd.nextDirection
        outputPair = [];
        var existingPoint = getInputFromPoint(nextPoint, pointsCovered, initialinput);
        input = existingPoint.existingColor; //getInputFromPoint(nextPoint, pointsCovered);
        
        pointsCovered.push(coloredPoint);
      }
       
      }
      if (output.stop) {
        // console.log()
        finalOutput = arr;
        break;
      }
      if (output.nextIndex >= 0) {
        indx = output.nextIndex;
      } else {
        throw (new Error("invalid opcode"));
      }

    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  return pointsCovered;
}

var day11input = [3, 8, 1005, 8, 351, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 102, 1, 8, 28, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1002, 8, 1, 51, 1006, 0, 85, 2, 1109, 8, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 102, 1, 8, 80, 1, 2, 2, 10, 1, 1007, 19, 10, 1, 1001, 13, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 113, 1, 2, 1, 10, 1, 1109, 17, 10, 1, 108, 20, 10, 2, 1005, 3, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1002, 8, 1, 151, 2, 5, 19, 10, 1, 104, 19, 10, 1, 109, 3, 10, 1006, 0, 78, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1002, 8, 1, 189, 1006, 0, 3, 2, 1004, 1, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 1001, 8, 0, 218, 1, 1008, 6, 10, 1, 104, 8, 10, 1006, 0, 13, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 102, 1, 8, 251, 1006, 0, 17, 1006, 0, 34, 1006, 0, 24, 1006, 0, 4, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 102, 1, 8, 285, 1006, 0, 25, 2, 1103, 11, 10, 1006, 0, 75, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 101, 0, 8, 316, 2, 1002, 6, 10, 1006, 0, 30, 2, 106, 11, 10, 1006, 0, 21, 101, 1, 9, 9, 1007, 9, 1072, 10, 1005, 10, 15, 99, 109, 673, 104, 0, 104, 1, 21101, 0, 937151009684, 1, 21101, 0, 368, 0, 1105, 1, 472, 21102, 386979963796, 1, 1, 21102, 379, 1, 0, 1106, 0, 472, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21101, 179410325723, 0, 1, 21101, 426, 0, 0, 1106, 0, 472, 21101, 0, 179355823195, 1, 21102, 437, 1, 0, 1106, 0, 472, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21101, 0, 825460785920, 1, 21101, 460, 0, 0, 1105, 1, 472, 21102, 1, 838429614848, 1, 21102, 1, 471, 0, 1105, 1, 472, 99, 109, 2, 21202, -1, 1, 1, 21102, 40, 1, 2, 21102, 1, 503, 3, 21101, 493, 0, 0, 1105, 1, 536, 109, -2, 2106, 0, 0, 0, 1, 0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 498, 499, 514, 4, 0, 1001, 498, 1, 498, 108, 4, 498, 10, 1006, 10, 530, 1101, 0, 0, 498, 109, -2, 2106, 0, 0, 0, 109, 4, 2101, 0, -1, 535, 1207, -3, 0, 10, 1006, 10, 553, 21101, 0, 0, -3, 21202, -3, 1, 1, 22101, 0, -2, 2, 21101, 0, 1, 3, 21101, 572, 0, 0, 1105, 1, 577, 109, -4, 2105, 1, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 600, 2207, -4, -2, 10, 1006, 10, 600, 21202, -4, 1, -4, 1106, 0, 668, 21202, -4, 1, 1, 21201, -3, -1, 2, 21202, -2, 2, 3, 21102, 619, 1, 0, 1105, 1, 577, 22102, 1, 1, -4, 21101, 0, 1, -1, 2207, -4, -2, 10, 1006, 10, 638, 21101, 0, 0, -1, 22202, -2, -1, -2, 2107, 0, -3, 10, 1006, 10, 660, 22101, 0, -1, 1, 21101, 660, 0, 0, 106, 0, 535, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2105, 1, 0];


var inputForProgram = day11input.slice(0);
var output = runProgram(inputForProgram, 0, 0, {
  x: 100,
  y: 100
}, "UP");

//console.log(output[1]);

// console.log(output);




var outputSorted  = output.sort((a,b) => {
  return b.indx - a.indx;
});

// console.log(outputSorted.length);

output = outputSorted.filter((ot, indx, arr) => {
  var indxfound = arr.findIndex((arEl) => arEl.x === ot.x && arEl.y === ot.y);
 
  return indx === indxfound;
});
console.log("Answer to day 11 ---> Part 1  --> ");
console.log(output.length);

output = runProgram(inputForProgram, 1, 0, {
  x: 100,
  y: 100
}, "UP");


outputSorted  = output.sort((a,b) => {
  return b.x - a.x;
});

var maxX = outputSorted[0].x;
var minX = outputSorted[outputSorted.length - 1].x

outputSorted  = output.sort((a,b) => {
  return b.y - a.y;
});
var maxY = outputSorted[0].y;
var minY = outputSorted[outputSorted.length - 1].y;



var row = "";
for(var yindx = minY; yindx < maxY + 1; yindx++ ){
   for (var xindx = minX; xindx < maxX + 1; xindx++ ){ 
         var elementFound = output.find((el) => {
           return el.x === xindx && el.y === yindx;
         });
         var color = elementFound ? elementFound.color : 0;
         row = row + (color === 0? ' ' : '#');

   }
   row = row + '\r\n';
}
console.log("Answer to day 11 ---> Part 2  --> ");
console.log(row);


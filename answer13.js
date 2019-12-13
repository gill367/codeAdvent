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
async function wait(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, interval);
  });
}

function print(indx, inputForThis, inputForProgram, score, output, minX, maxX, minY, maxY) {
  return new Promise(async (resolve, reject) => {
    var row = "";
    for (var yindx = minY; yindx < maxY + 1; yindx++) {
      for (var xindx = minX; xindx < maxX + 1; xindx++) {
        var elementsFound = output.filter((el) => {
          return el.x === xindx && el.y === yindx;
        });
        var elementFound = elementsFound.sort((a, b) => {
          return b.tile - a.tile;
        })[0];
        var tile = elementFound && elementFound.tile >= 0 ? elementFound.tile : 0;
        var elementMap = [' ', '*', '#', '_', '@', ' '];
        // if(elementMap[tile] === '@') {
        //   row = row.replace(/\@/gi, ' ');

        // }
        // if(elementMap[tile] === '_') {
        //   row = row.replace(/\_/gi, ' ');
          
        // }
        row = row + elementMap[tile];
      }
      row = row + '\r\n';
    }
   // row = row.
    console.clear();

  //  console.log(row);
    console.log(score);
    console.log(indx);
    console.log(inputForThis);
    printTilesCount(output);
  //  console.log(inputForProgram.toString());
   // await wait(1);
    resolve(true);
  });
}
async function runProgram( day2Input_changed, input, relBaseInput) {
  var arr = day2Input_changed;
  var outputSet = [];
  var output3 = [];
  var score = 0;
  var ballX, paddleX;
  var relBase = relBaseInput ? relBaseInput : 0;
  try {
    for (var indx = 0; arr && !!arr.length && indx < arr.length;) {
      output = processInput(arr, indx, input, relBase);
      arr = output.result;
      relBase = output.realtiveBase;
      if (output.output === 0 || !!output.output) {
        
        output3.push(output.output);
        if(output3.length === 333333333333) {
          if(output3[2] === 4) {
            ballX = output3[0];
            outputSet = outputSet.map(el => {
                 if(el === 4) {
                   return 5;
                 } else {
                  return el;
                 }
                
            });
          }
          if(output3[2] === 3) {
            paddleX = output3[0];
            outputSet = outputSet.map(el => {
              if(el === 3) {
                return 0;
              } else {
               return el;
              }
             
         });
          }
         input = (!!ballX && !!paddleX) ? ballX - paddleX : input;
         var map = calculateTiles(outputSet);
    var score = map.filter(el => el.x === -1).sort((a, b) => {
      return b.tile > a.tile
    })[0];
      //   await print(indx, input, arr, score, map, 0, 40, 0, 30);
         output3 = [];
        }
        outputSet.push(output.output);
        
        
      }
      if (output.stop) {
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
  return {
    output: outputSet,
    currentState: output
  };
}

function calculateTiles(output) {
  var map = [];
  for (var ind = 0; ind < output.length; ind = ind + 3) {
    map.push({
      indx: ind,
      x: output[ind],
      y: output[ind + 1],
      tile: output[ind + 2]
    })
  }
  return map;
}

function printTilesCount(map) {
  var ballTiles = map.filter(el => el.tile === 4);
  var blockTiles = map.filter(el => el.tile === 2);
  var score = map.filter(el => el.x === -1);
  console.log(ballTiles);
  console.log(ballTiles.length);
  console.log(blockTiles.length);
  console.log(score.tile);
}
async function run() {
  // var day9Input = [1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1101,3,0,1000,109,988,209,12,9,1000,209,6,209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,4,17,104,0,99,0,0,1101,37,0,1013,1101,426,0,1027,1101,36,0,1000,1101,0,606,1023,1102,34,1,1011,1102,1,712,1029,1102,1,27,1007,1101,831,0,1024,1102,32,1,1002,1102,1,1,1021,1101,429,0,1026,1102,1,826,1025,1101,0,717,1028,1102,1,20,1018,1101,0,24,1004,1102,31,1,1009,1101,22,0,1015,1102,38,1,1014,1102,613,1,1022,1102,29,1,1017,1102,0,1,1020,1102,1,21,1008,1102,33,1,1012,1101,0,30,1006,1101,0,28,1016,1102,1,26,1005,1102,35,1,1019,1101,25,0,1003,1102,1,23,1001,1102,1,39,1010,109,-3,2102,1,5,63,1008,63,34,63,1005,63,205,1001,64,1,64,1106,0,207,4,187,1002,64,2,64,109,-2,1201,7,0,63,1008,63,34,63,1005,63,227,1105,1,233,4,213,1001,64,1,64,1002,64,2,64,109,21,21102,40,1,3,1008,1019,37,63,1005,63,257,1001,64,1,64,1106,0,259,4,239,1002,64,2,64,109,-4,21101,41,0,2,1008,1014,38,63,1005,63,279,1105,1,285,4,265,1001,64,1,64,1002,64,2,64,109,-10,1201,4,0,63,1008,63,30,63,1005,63,307,4,291,1105,1,311,1001,64,1,64,1002,64,2,64,109,6,1207,0,22,63,1005,63,329,4,317,1105,1,333,1001,64,1,64,1002,64,2,64,109,-5,1207,5,20,63,1005,63,353,1001,64,1,64,1106,0,355,4,339,1002,64,2,64,109,8,2108,29,-5,63,1005,63,375,1001,64,1,64,1105,1,377,4,361,1002,64,2,64,109,15,1206,-6,395,4,383,1001,64,1,64,1105,1,395,1002,64,2,64,109,-11,21107,42,43,4,1005,1019,413,4,401,1106,0,417,1001,64,1,64,1002,64,2,64,109,6,2106,0,6,1105,1,435,4,423,1001,64,1,64,1002,64,2,64,109,-15,1208,-3,24,63,1005,63,455,1001,64,1,64,1105,1,457,4,441,1002,64,2,64,109,-13,1208,10,25,63,1005,63,475,4,463,1106,0,479,1001,64,1,64,1002,64,2,64,109,21,21108,43,42,3,1005,1017,495,1106,0,501,4,485,1001,64,1,64,1002,64,2,64,109,-14,2107,31,2,63,1005,63,519,4,507,1106,0,523,1001,64,1,64,1002,64,2,64,109,-4,1202,8,1,63,1008,63,24,63,1005,63,549,4,529,1001,64,1,64,1105,1,549,1002,64,2,64,109,1,2108,23,4,63,1005,63,567,4,555,1105,1,571,1001,64,1,64,1002,64,2,64,109,2,2101,0,5,63,1008,63,21,63,1005,63,591,1105,1,597,4,577,1001,64,1,64,1002,64,2,64,109,28,2105,1,-4,1001,64,1,64,1105,1,615,4,603,1002,64,2,64,109,-10,1205,4,633,4,621,1001,64,1,64,1106,0,633,1002,64,2,64,109,2,1206,2,645,1106,0,651,4,639,1001,64,1,64,1002,64,2,64,109,-4,1202,-6,1,63,1008,63,28,63,1005,63,671,1105,1,677,4,657,1001,64,1,64,1002,64,2,64,109,-9,21102,44,1,4,1008,1010,44,63,1005,63,699,4,683,1105,1,703,1001,64,1,64,1002,64,2,64,109,31,2106,0,-9,4,709,1105,1,721,1001,64,1,64,1002,64,2,64,109,-30,21108,45,45,6,1005,1013,743,4,727,1001,64,1,64,1106,0,743,1002,64,2,64,109,2,21101,46,0,3,1008,1012,46,63,1005,63,765,4,749,1106,0,769,1001,64,1,64,1002,64,2,64,109,-5,2101,0,0,63,1008,63,24,63,1005,63,795,4,775,1001,64,1,64,1105,1,795,1002,64,2,64,109,6,2107,32,-1,63,1005,63,815,1001,64,1,64,1106,0,817,4,801,1002,64,2,64,109,19,2105,1,-5,4,823,1106,0,835,1001,64,1,64,1002,64,2,64,109,-12,21107,47,46,-1,1005,1016,851,1105,1,857,4,841,1001,64,1,64,1002,64,2,64,109,-2,1205,5,873,1001,64,1,64,1105,1,875,4,863,1002,64,2,64,109,-6,2102,1,-8,63,1008,63,23,63,1005,63,897,4,881,1105,1,901,1001,64,1,64,4,64,99,21101,0,27,1,21101,0,915,0,1106,0,922,21201,1,44808,1,204,1,99,109,3,1207,-2,3,63,1005,63,964,21201,-2,-1,1,21101,942,0,0,1105,1,922,21201,1,0,-1,21201,-2,-3,1,21102,957,1,0,1105,1,922,22201,1,-1,-2,1106,0,968,21202,-2,1,-2,109,-3,2105,1,0];
  var day13input = [2, 380, 379, 385, 1008, 2267, 610415, 381, 1005, 381, 12, 99, 109, 2268, 1101, 0, 0, 383, 1101, 0, 0, 382, 20102, 1, 382, 1, 20101, 0, 383, 2, 21101, 37, 0, 0, 1106, 0, 578, 4, 382, 4, 383, 204, 1, 1001, 382, 1, 382, 1007, 382, 37, 381, 1005, 381, 22, 1001, 383, 1, 383, 1007, 383, 22, 381, 1005, 381, 18, 1006, 385, 69, 99, 104, -1, 104, 0, 4, 386, 3, 384, 1007, 384, 0, 381, 1005, 381, 94, 107, 0, 384, 381, 1005, 381, 108, 1105, 1, 161, 107, 1, 392, 381, 1006, 381, 161, 1101, -1, 0, 384, 1106, 0, 119, 1007, 392, 35, 381, 1006, 381, 161, 1101, 0, 1, 384, 21001, 392, 0, 1, 21102, 1, 20, 2, 21101, 0, 0, 3, 21102, 138, 1, 0, 1105, 1, 549, 1, 392, 384, 392, 21002, 392, 1, 1, 21101, 0, 20, 2, 21101, 3, 0, 3, 21101, 161, 0, 0, 1106, 0, 549, 1101, 0, 0, 384, 20001, 388, 390, 1, 20101, 0, 389, 2, 21102, 1, 180, 0, 1105, 1, 578, 1206, 1, 213, 1208, 1, 2, 381, 1006, 381, 205, 20001, 388, 390, 1, 21002, 389, 1, 2, 21101, 205, 0, 0, 1106, 0, 393, 1002, 390, -1, 390, 1102, 1, 1, 384, 21002, 388, 1, 1, 20001, 389, 391, 2, 21102, 228, 1, 0, 1106, 0, 578, 1206, 1, 261, 1208, 1, 2, 381, 1006, 381, 253, 20101, 0, 388, 1, 20001, 389, 391, 2, 21101, 253, 0, 0, 1105, 1, 393, 1002, 391, -1, 391, 1101, 1, 0, 384, 1005, 384, 161, 20001, 388, 390, 1, 20001, 389, 391, 2, 21102, 1, 279, 0, 1105, 1, 578, 1206, 1, 316, 1208, 1, 2, 381, 1006, 381, 304, 20001, 388, 390, 1, 20001, 389, 391, 2, 21101, 304, 0, 0, 1105, 1, 393, 1002, 390, -1, 390, 1002, 391, -1, 391, 1101, 1, 0, 384, 1005, 384, 161, 20102, 1, 388, 1, 20101, 0, 389, 2, 21101, 0, 0, 3, 21102, 338, 1, 0, 1105, 1, 549, 1, 388, 390, 388, 1, 389, 391, 389, 20102, 1, 388, 1, 20101, 0, 389, 2, 21101, 0, 4, 3, 21102, 1, 365, 0, 1106, 0, 549, 1007, 389, 21, 381, 1005, 381, 75, 104, -1, 104, 0, 104, 0, 99, 0, 1, 0, 0, 0, 0, 0, 0, 265, 16, 17, 1, 1, 18, 109, 3, 21202, -2, 1, 1, 21201, -1, 0, 2, 21102, 1, 0, 3, 21102, 414, 1, 0, 1105, 1, 549, 22101, 0, -2, 1, 21202, -1, 1, 2, 21101, 429, 0, 0, 1105, 1, 601, 2102, 1, 1, 435, 1, 386, 0, 386, 104, -1, 104, 0, 4, 386, 1001, 387, -1, 387, 1005, 387, 451, 99, 109, -3, 2106, 0, 0, 109, 8, 22202, -7, -6, -3, 22201, -3, -5, -3, 21202, -4, 64, -2, 2207, -3, -2, 381, 1005, 381, 492, 21202, -2, -1, -1, 22201, -3, -1, -3, 2207, -3, -2, 381, 1006, 381, 481, 21202, -4, 8, -2, 2207, -3, -2, 381, 1005, 381, 518, 21202, -2, -1, -1, 22201, -3, -1, -3, 2207, -3, -2, 381, 1006, 381, 507, 2207, -3, -4, 381, 1005, 381, 540, 21202, -4, -1, -1, 22201, -3, -1, -3, 2207, -3, -4, 381, 1006, 381, 529, 22101, 0, -3, -7, 109, -8, 2106, 0, 0, 109, 4, 1202, -2, 37, 566, 201, -3, 566, 566, 101, 639, 566, 566, 2102, 1, -1, 0, 204, -3, 204, -2, 204, -1, 109, -4, 2105, 1, 0, 109, 3, 1202, -1, 37, 593, 201, -2, 593, 593, 101, 639, 593, 593, 21001, 0, 0, -2, 109, -3, 2105, 1, 0, 109, 3, 22102, 22, -2, 1, 22201, 1, -1, 1, 21102, 1, 409, 2, 21102, 1, 463, 3, 21102, 1, 814, 4, 21102, 1, 630, 0, 1106, 0, 456, 21201, 1, 1453, -2, 109, -3, 2105, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 1, 1, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 1, 1, 0, 2, 0, 0, 2, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 1, 1, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2, 2, 0, 1, 1, 0, 2, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 0, 2, 0, 0, 0, 1, 1, 0, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 1, 1, 0, 0, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 1, 1, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 72, 10, 67, 45, 58, 25, 55, 73, 97, 49, 19, 51, 58, 95, 30, 82, 74, 9, 98, 96, 38, 64, 30, 45, 14, 73, 42, 5, 3, 61, 68, 23, 18, 14, 9, 16, 21, 7, 77, 39, 38, 16, 82, 17, 58, 87, 90, 64, 52, 1, 96, 67, 66, 16, 65, 15, 22, 41, 69, 90, 93, 92, 96, 45, 68, 17, 63, 51, 15, 61, 51, 93, 65, 55, 42, 76, 48, 52, 31, 98, 6, 88, 69, 65, 65, 30, 51, 88, 4, 13, 36, 90, 80, 23, 31, 42, 63, 86, 52, 15, 79, 78, 59, 77, 57, 71, 84, 81, 73, 56, 1, 5, 7, 86, 75, 31, 63, 76, 21, 73, 16, 41, 86, 15, 78, 85, 2, 79, 63, 54, 79, 65, 87, 13, 86, 96, 81, 69, 27, 76, 8, 48, 5, 79, 10, 74, 76, 86, 95, 55, 72, 52, 23, 41, 50, 46, 68, 29, 86, 61, 96, 29, 34, 40, 86, 86, 1, 20, 90, 35, 69, 64, 50, 51, 75, 65, 93, 19, 5, 15, 96, 3, 88, 8, 43, 66, 88, 72, 84, 69, 42, 4, 95, 51, 80, 81, 27, 75, 92, 22, 45, 54, 63, 51, 82, 91, 13, 25, 54, 41, 84, 84, 29, 98, 50, 91, 11, 40, 69, 13, 47, 42, 72, 46, 87, 31, 27, 98, 65, 94, 26, 51, 79, 39, 29, 38, 42, 46, 25, 36, 26, 66, 12, 93, 58, 1, 61, 41, 37, 57, 60, 60, 9, 70, 63, 26, 56, 1, 27, 5, 11, 93, 17, 48, 95, 19, 79, 16, 14, 16, 29, 79, 56, 16, 26, 37, 50, 10, 38, 53, 4, 10, 3, 57, 20, 59, 16, 51, 88, 66, 74, 91, 56, 42, 84, 30, 36, 31, 36, 58, 68, 66, 91, 36, 71, 30, 39, 96, 50, 84, 76, 95, 14, 89, 75, 59, 77, 66, 36, 88, 62, 60, 3, 45, 13, 39, 48, 33, 59, 21, 19, 35, 90, 81, 66, 52, 75, 34, 70, 55, 56, 47, 22, 20, 87, 73, 73, 76, 73, 8, 96, 55, 46, 5, 1, 64, 27, 8, 37, 87, 50, 8, 79, 74, 63, 26, 43, 44, 2, 85, 91, 28, 13, 16, 15, 55, 87, 94, 28, 86, 66, 29, 34, 46, 18, 41, 37, 94, 63, 31, 78, 48, 17, 4, 25, 62, 15, 10, 18, 19, 97, 50, 78, 5, 79, 5, 70, 64, 86, 61, 58, 59, 61, 5, 71, 68, 14, 24, 17, 56, 85, 52, 64, 92, 45, 90, 94, 55, 47, 5, 56, 59, 20, 15, 41, 36, 58, 55, 25, 47, 45, 69, 58, 36, 44, 80, 94, 52, 84, 17, 27, 20, 44, 51, 93, 10, 56, 77, 45, 29, 93, 63, 96, 95, 47, 31, 63, 69, 64, 74, 53, 34, 36, 20, 14, 40, 30, 61, 86, 15, 3, 94, 61, 43, 75, 59, 64, 41, 34, 98, 32, 65, 73, 18, 30, 46, 66, 38, 68, 25, 96, 16, 37, 54, 38, 44, 26, 52, 1, 2, 21, 93, 37, 26, 4, 45, 69, 82, 59, 34, 55, 34, 77, 88, 46, 70, 32, 56, 82, 10, 20, 31, 40, 20, 55, 3, 3, 93, 95, 65, 56, 61, 68, 41, 35, 62, 20, 58, 55, 42, 41, 40, 33, 51, 6, 52, 84, 27, 62, 81, 32, 35, 87, 97, 79, 7, 97, 77, 40, 48, 74, 4, 6, 36, 58, 59, 25, 6, 5, 84, 7, 44, 51, 88, 37, 9, 30, 29, 26, 91, 41, 72, 39, 24, 68, 58, 49, 80, 49, 43, 98, 43, 92, 9, 49, 64, 10, 96, 50, 86, 56, 2, 72, 58, 80, 57, 77, 61, 74, 14, 42, 50, 55, 40, 21, 77, 20, 19, 16, 80, 84, 92, 27, 32, 37, 80, 59, 69, 13, 11, 19, 6, 94, 54, 88, 51, 69, 41, 54, 68, 36, 82, 68, 19, 77, 85, 37, 5, 58, 61, 72, 5, 67, 17, 35, 29, 18, 71, 46, 5, 29, 8, 93, 97, 36, 37, 25, 93, 27, 33, 93, 79, 10, 84, 75, 6, 91, 98, 34, 32, 37, 70, 18, 84, 52, 32, 11, 88, 44, 69, 58, 92, 52, 68, 77, 39, 90, 9, 58, 74, 1, 53, 56, 64, 75, 46, 59, 39, 52, 32, 41, 62, 81, 75, 7, 93, 29, 89, 51, 34, 31, 93, 70, 94, 30, 98, 68, 3, 60, 2, 2, 49, 31, 15, 65, 11, 78, 70, 2, 50, 29, 9, 9, 85, 65, 52, 28, 95, 55, 77, 98, 29, 65, 56, 51, 32, 44, 42, 82, 14, 29, 22, 5, 29, 65, 86, 84, 88, 58, 63, 10, 13, 13, 51, 97, 17, 57, 19, 39, 83, 72, 93, 15, 54, 31, 83, 3, 43, 21, 83, 74, 2, 86, 47, 25, 89, 20, 11, 68, 80, 29, 21, 58, 69, 610415];
  var inputForProgram = day13input.slice(0);
  for (var ji = 0; ji < 1000000; ji++) {
    var inputForThis = [-1, 1][ji % 2];
    var outputResult = await runProgram(inputForProgram, 1, 0);
    inputForProgram = outputResult.currentState.result;
    var output = outputResult.output;
    var map = calculateTiles(output);
    
  //  await print(ji, inputForThis, inputForProgram, score, map, 0, 40, 0, 30);
    var blockTiles = map.filter(el => el.tile === 2);
   
    if (blockTiles.length === 0) {
      var score = map.filter(el => el.x === -1).sort((a, b) => {
        return b.tile > a.tile
      })[0];
      console.log(score);
      break;
    }
  }
}
run();
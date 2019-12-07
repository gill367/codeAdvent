var count = 0;
console.log("input day 7 ------------------------------------------------------------ ------------------------------------------------ ---->");

function processInput(arr, op, indx, para1, para2, position, inp, inp2, inpCount, initialPhaseProcessed) {
  var stop = false;
  var output;
  var opString = op.toString();
  var nextIndex = indx;

  function findOpstringValue(inpstring, index1) {
    return inpstring.length >= index1 ? inpstring[inpstring.length - index1] : "0"
  }

  function valueAsPerMode(inpOpString, arr1, indxPara, index2) {
    var mode = findOpstringValue(inpOpString, index2 + 2);
    if (mode === "0") {
      return arr1[arr1[indxPara]];
    } else if (mode === "1") {
      return arr1[indxPara];
    }
    throw new Error("not correct input");
  }
  var opcodeString = findOpstringValue(opString, 2) + "" + findOpstringValue(opString, 1);;
  if (opcodeString === '01') {
    arr[position] = valueAsPerMode(opString, arr, indx + 1, 1) + valueAsPerMode(opString, arr, indx + 2, 2);
    if (position === indx) {
      nextIndex = indx
    } else {
      nextIndex = indx + 4;
    }
  } else if (opcodeString === '02') {
    arr[position] = valueAsPerMode(opString, arr, indx + 1, 1) * valueAsPerMode(opString, arr, indx + 2, 2);
    if (position === indx) {
      nextIndex = indx
    } else {
      nextIndex = indx + 4;
    }
  } else if (opcodeString === '03') {
    inpCount = inpCount + 1;
    arr[para1] = inpCount > 1 || initialPhaseProcessed ? inp2 : inp;
    if (position === indx) {
      nextIndex = indx
    } else {
      nextIndex = indx + 2;
    }
  } else if (opcodeString === '04') {
    output = valueAsPerMode(opString, arr, indx + 1, 1);
    nextIndex = indx + 2;
  } else if (opcodeString === '05') {
    var value = valueAsPerMode(opString, arr, indx + 1, 1);
    if (value !== 0) {
      nextIndex = valueAsPerMode(opString, arr, indx + 2, 2);
    } else {
      nextIndex = indx + 3;
    }
  } else if (opcodeString === '06') {
    var value = valueAsPerMode(opString, arr, indx + 1, 1);
    if (value === 0) {
      nextIndex = valueAsPerMode(opString, arr, indx + 2, 2);
    } else {
      nextIndex = indx + 3;
    }
  } else if (opcodeString === '07') {
    var value1 = valueAsPerMode(opString, arr, indx + 1, 1);
    var value2 = valueAsPerMode(opString, arr, indx + 2, 2);
    if (value1 < value2) {
      arr[arr[indx + 3]] = 1;
    } else {
      arr[arr[indx + 3]] = 0;
    }
    if (position === indx) {
      nextIndex = indx
    } else {
      nextIndex = indx + 4;
    }
  } else if (opcodeString === '08') {
    var value1 = valueAsPerMode(opString, arr, indx + 1, 1);
    var value2 = valueAsPerMode(opString, arr, indx + 2, 2);
    if (value1 === value2) {
      arr[arr[indx + 3]] = 1;
    } else {
      arr[arr[indx + 3]] = 0;
    }
    if (position === indx) {
      nextIndex = indx
    } else {
      nextIndex = indx + 4;
    }
  } else if (op === 99) {
    stop = true;
  } else {
    console.log("Error op" + op + "- indx" + indx + "- opcodeString" + opcodeString +
      " - input " + inp + "- position" + position);
    console.log("error");
    throw (new Error("invalid input"));
    // stop = true;
  }
  return {
    result: arr,
    stop: stop,
    output: output,
    nextIndex: nextIndex,
    inpCount: inpCount
  };
}
//console.log(textInput);
function findCalculatedIndex0(day2Input_changed, inputForMain, secondInput, nextIndex, initialPhaseProcessed) {
  var arr = day2Input_changed;
  var finalOutput = [];
  var outputSet = [];
  var inpCount = 0;
  //  console.log(arr.length);
  try {
    for (var indx = nextIndex; arr && !!arr.length && indx < arr.length;) {
      var el = arr[indx];
      output = processInput(arr, el, indx, arr[indx + 1], arr[indx + 2], arr[indx + 3], inputForMain, secondInput, inpCount, initialPhaseProcessed);
      inpCount = output.inpCount;
      arr = output.result;
      if (output.output === 0 || !!output.output) {
        outputSet.push(output.output);
        finalOutput = arr;
        break;
      }
      if (output.stop) {
        finalOutput = arr;
        break;
      }
      if (output.nextIndex) {
        indx = output.nextIndex;
      } else {
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return {
    out: outputSet,
    stop: output.stop,
    finalOutput: finalOutput,
    nextIndex: output.nextIndex
  };
}

function amplifierProcess(input, phase, secondInput, nextIndex, initialPhaseProcessed) {
  // console.log()
  var intCode = input.slice(0);
  var output = findCalculatedIndex0(intCode, phase, secondInput, nextIndex, initialPhaseProcessed);
  //console.log(output);
  return output;
}
var inputForDay71 = [3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
  27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5
];
var inputForDay7 = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 46, 59, 80, 105, 122, 203, 284, 365, 446, 99999, 3, 9, 102, 3, 9, 9, 1001, 9, 5, 9, 102, 2, 9, 9, 1001, 9, 3, 9, 102, 4, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 1002, 9, 3, 9, 1001, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1002, 9, 4, 9, 1001, 9, 2, 9, 102, 4, 9, 9, 101, 3, 9, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 102, 5, 9, 9, 101, 4, 9, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99];
var outPutSetFromLastAmp = [];
var outputs = [];
for (var i = 56789; i <= 98765; i++) {
  var str = i + "";
  if (i < 10000) {
    str = "0" + str;
  }
  try {
    var duplicatePresent = 0;
    var invalidNumber = false;
    ["0", "1", "2", "3", "4"].forEach(el => {
      if (str.indexOf(el) !== -1) {
        invalidNumber = true;
      }
    });
    if (invalidNumber) {
      continue;
    }
    var j = str.split('').filter((item, index) => str.split('').indexOf(item) != index)
    
    if (j.length > 0) {
      continue;
    }
  
    if (!duplicatePresent && !invalidNumber) {
     
      tryamp(0, str, [inputForDay7, inputForDay7, inputForDay7, inputForDay7, inputForDay7], [0, 0, 0, 0, 0]);
    }
  } catch (error) {
    console.log(error);
  }
}

function tryamp(inputFOr0, str, inpAr, nextIndexAr) {
  var breakit = false;
  var initialPhaseProcessed = [false, false, false, false, false];
  var inputTonextOne = [inputFOr0];
  outputs = [];
  while (!breakit) {
    count = count + 1;
    for (var arindx = 0; arindx < 5; arindx++) {
      
      var amp = amplifierProcess(inpAr[arindx], str[arindx] * 1, inputTonextOne[arindx], nextIndexAr[arindx], initialPhaseProcessed[arindx]);
     
      if (arindx === 4 && amp.stop) {
        breakit = true;
        outPutSetFromLastAmp.push({
          output: inputTonextOne[0],
          combination: str
        });
      }
      nextIndexAr[arindx] = amp.nextIndex;
      inpAr[arindx] = amp.finalOutput;
      initialPhaseProcessed[arindx] = true;
      inputTonextOne[(arindx + 1) < 5 ? (arindx + 1) : 0] = amp.out[0];
      if (arindx === 4) {
        outputs.push(amp.out[0]);
      }
    }
  }
}
outPutSetFromLastAmp.sort((a, b) => {
  return b.output - a.output;
})
outputs.sort((a, b) => {
  return b - a;
})
console.log(outPutSetFromLastAmp[0]);
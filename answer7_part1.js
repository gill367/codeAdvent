function processInput(arr, op, indx, para1, para2, position, inp, inp2, inpCount) {
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
    arr[para1] = inpCount > 1 ? inp2 : inp;
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
function findCalculatedIndex0(day2Input_changed, inputForMain, secondInput) {
  var arr = day2Input_changed;
  var finalOutput = [];
  var outputSet = [];
  var inpCount = 0;
  //  console.log(arr.length);
  try {
    for (var indx = 0; arr && !!arr.length && indx < arr.length;) {
      var el = arr[indx];
      output = processInput(arr, el, indx, arr[indx + 1], arr[indx + 2], arr[indx + 3], inputForMain, secondInput, inpCount);
      inpCount = output.inpCount;
      arr = output.result;
      if (output.output === 0 || !!output.output) {
        outputSet.push(output.output);
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
  return outputSet;
}

function amplifierProcess(input, phase, secondInput) {
  // console.log()
  var intCode = input.slice(0);
  var output = findCalculatedIndex0(intCode, phase, secondInput);
  // console.log(output);
  return output[0];
}
var day7input = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33,
  1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0
];
var inputForDay7 = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 46, 59, 80, 105, 122, 203, 284, 365, 446, 99999, 3, 9, 102, 3, 9, 9, 1001, 9, 5, 9, 102, 2, 9, 9, 1001, 9, 3, 9, 102, 4, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 1002, 9, 3, 9, 1001, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1002, 9, 4, 9, 1001, 9, 2, 9, 102, 4, 9, 9, 101, 3, 9, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 102, 5, 9, 9, 101, 4, 9, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99];
var outPutSetFromLastAmp = [];
for (var i = 1242; i <= 43210; i++) {
  var str = i + "";
  if (i < 10000) {
    str = "0" + str;
  }
  try {
    var duplicatePresent = 0;
    var invalidNumber = false;
    ["5", "6", "7", "8", "9"].forEach(el => {
      if (str.indexOf(el) !== -1) {
        invalidNumber = true;
      }
    });
    if (invalidNumber) {
      continue;
    }
    var j = str.split('').filter((item, index) => str.split('').indexOf(item) != index)
    // console.log(j);
    if (j.length > 0) {
      continue;
    }
    // console.log(str);
    if (!duplicatePresent && !invalidNumber) {
      var amp1 = amplifierProcess(inputForDay7, str[0] * 1, 0);
      var amp2 = amplifierProcess(inputForDay7, str[1] * 1, amp1);
      var amp3 = amplifierProcess(inputForDay7, str[2] * 1, amp2);
      var amp4 = amplifierProcess(inputForDay7, str[3] * 1, amp3);
      var amp5 = amplifierProcess(inputForDay7, str[4] * 1, amp4);
      outPutSetFromLastAmp.push({
        output: amp5,
        combination: str
      });
    }
  } catch (error) {}
}
outPutSetFromLastAmp.sort((a, b) => {
  return b.output - a.output;
})
console.log(outPutSetFromLastAmp[0]);

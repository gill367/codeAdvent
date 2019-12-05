function processInput(arr, op, indx, para1, para2, position, inp) {
    var stop = false;
    var output;
    var opString = op.toString();
    var nextIndex = indx;
    function findOpstringValue(inpstring, index1) {
      return inpstring.length >= index1 ? inpstring[inpstring.length - index1] : "0"
    }

    function valueAsPerMode(inpOpString, arr1, indxPara, index2) {
      var mode = findOpstringValue(inpOpString, index2 + 2);
      if(mode === "0") {
        return arr1[arr1[indxPara]];
      } else if(mode === "1"){
        return arr1[indxPara];

      }

      throw new Error("not correct input");

    }
    var opcodeString = findOpstringValue(opString, 2) + "" + findOpstringValue(opString, 1);
    ;
    if(opcodeString === '01') {
       
        arr[position] = valueAsPerMode(opString, arr, indx + 1 ,1) + valueAsPerMode(opString, arr, indx + 2 ,2);
        if(position === indx) {
          nextIndex = indx
        } else {
          nextIndex = indx + 4;
        }
        
    
    }

    else if(opcodeString === '02') {
      arr[position] = valueAsPerMode(opString, arr, indx + 1 ,1) * valueAsPerMode(opString, arr, indx + 2 ,2);
      if(position === indx) {
        nextIndex = indx
      } else {
        nextIndex = indx + 4;
      }
   
    }

    else if(opcodeString === '03') {
      arr[para1] = inp;
      if(position === indx) {
        nextIndex = indx
      } else {
        nextIndex = indx + 2;
      }
  }
  else if(opcodeString === '04') {
    output = valueAsPerMode(opString, arr, indx + 1 ,1);
    nextIndex = indx + 2;
}
else if(opcodeString === '05') {
 var value = valueAsPerMode(opString, arr, indx + 1 ,1);
  if(value !== 0) {

     nextIndex = valueAsPerMode(opString, arr, indx + 2 ,2);
  
  } else {
    nextIndex = indx + 3;
  }
 
}
else if(opcodeString === '06') {
  var value = valueAsPerMode(opString, arr, indx + 1 ,1);
  if(value === 0) {
    nextIndex =  valueAsPerMode(opString, arr, indx + 2 ,2) ;
  } else {
    nextIndex = indx + 3;
  }
}
else if(opcodeString === '07') {
  var value1 = valueAsPerMode(opString, arr, indx + 1 ,1);
  var value2 = valueAsPerMode(opString, arr, indx + 2 ,2);
  if(value1 < value2) {
     arr[arr[indx + 3]] = 1;
  } else{
    arr[arr[indx + 3]] = 0;
  }
  if(position === indx) {
    nextIndex = indx
  } else {
    nextIndex = indx + 4;
  }
}
else if(opcodeString === '08') {
  var value1 = valueAsPerMode(opString, arr, indx + 1 ,1);
  var value2 = valueAsPerMode(opString, arr, indx + 2 ,2);
  if(value1 === value2) {
    arr[arr[indx + 3]] = 1;
  } else{
    arr[arr[indx + 3]] = 0;
  }
  if(position === indx) {
    nextIndex = indx
  } else {
    nextIndex = indx + 4;
  }
}

    else if(op === 99) {
        stop = true;
    } else {
      console.log("Error op" + op + "- indx" + indx + "- opcodeString" +  opcodeString 
    + " - input " + inp + "- position" + position);
        console.log("error");
        throw(new Error("invalid input"));
       // stop = true;
    }
  //  console.log(arr);
//  console.log({stop: stop, output: output, nextIndex: nextIndex});
    return {result: arr, stop: stop, output: output, nextIndex: nextIndex};
}
//console.log(textInput);

function findCalculatedIndex0(day2Input_changed, inputForMain) {
    var arr = day2Input_changed;
    var finalOutput = [];
    var outputSet  = [];
  //  console.log(arr.length);
    
    try {
    for(var indx = 0; arr && !!arr.length && indx < arr.length; ){
   //     console.log(indx);
      //  console.log("at index ---- " + indx);
        var el = arr[indx];
      //  console.log("processInput");
      //  console.log(processInput);
    //  processInput(arr, op, indx, para1, para2, position, inp)
        output = processInput(arr, el, indx, arr[indx + 1], arr[indx + 2], arr[indx + 3], inputForMain);
        arr = output.result;
        if(output.output === 0 || !!output.output){
          outputSet.push(output.output);
        } 
        if(output.stop) {
            finalOutput = arr;
            break;
        }
        if(output.nextIndex) {
          indx = output.nextIndex;
        } else {
          break;
        }
     //   indx = indx + 4;
    } 
}catch (error){
 //   console.log(error);
}
    return outputSet;
}

var examplePart2 = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
var examplePart2_1 = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
//var day2Input = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,90,64,225,1101,15,56,225,1,14,153,224,101,-147,224,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,2,162,188,224,101,-2014,224,224,4,224,1002,223,8,223,101,6,224,224,1,223,224,223,1001,18,81,224,1001,224,-137,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,16,16,224,101,-256,224,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,101,48,217,224,1001,224,-125,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1002,158,22,224,1001,224,-1540,224,4,224,1002,223,8,223,101,2,224,224,1,223,224,223,1101,83,31,225,1101,56,70,225,1101,13,38,225,102,36,192,224,1001,224,-3312,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1102,75,53,225,1101,14,92,225,1101,7,66,224,101,-73,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,77,60,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,7,226,677,224,1002,223,2,223,1005,224,329,1001,223,1,223,1007,226,677,224,1002,223,2,223,1005,224,344,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,359,101,1,223,223,7,226,226,224,102,2,223,223,1005,224,374,101,1,223,223,8,677,677,224,1002,223,2,223,1005,224,389,1001,223,1,223,107,677,677,224,102,2,223,223,1006,224,404,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,434,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,449,1001,223,1,223,1107,226,226,224,1002,223,2,223,1005,224,464,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,494,1001,223,1,223,1107,226,677,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,226,226,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,539,1001,223,1,223,1108,677,677,224,1002,223,2,223,1005,224,554,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,8,226,677,224,102,2,223,223,1005,224,584,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,108,677,677,224,102,2,223,223,1006,224,614,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,629,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,107,677,226,224,1002,223,2,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226];
var day5Input = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,90,64,225,1101,15,56,225,1,14,153,224,101,-147,224,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,2,162,188,224,101,-2014,224,224,4,224,1002,223,8,223,101,6,224,224,1,223,224,223,1001,18,81,224,1001,224,-137,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,16,16,224,101,-256,224,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,101,48,217,224,1001,224,-125,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1002,158,22,224,1001,224,-1540,224,4,224,1002,223,8,223,101,2,224,224,1,223,224,223,1101,83,31,225,1101,56,70,225,1101,13,38,225,102,36,192,224,1001,224,-3312,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1102,75,53,225,1101,14,92,225,1101,7,66,224,101,-73,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,77,60,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,7,226,677,224,1002,223,2,223,1005,224,329,1001,223,1,223,1007,226,677,224,1002,223,2,223,1005,224,344,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,359,101,1,223,223,7,226,226,224,102,2,223,223,1005,224,374,101,1,223,223,8,677,677,224,1002,223,2,223,1005,224,389,1001,223,1,223,107,677,677,224,102,2,223,223,1006,224,404,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,434,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,449,1001,223,1,223,1107,226,226,224,1002,223,2,223,1005,224,464,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,494,1001,223,1,223,1107,226,677,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,226,226,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,539,1001,223,1,223,1108,677,677,224,1002,223,2,223,1005,224,554,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,8,226,677,224,102,2,223,223,1005,224,584,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,108,677,677,224,102,2,223,223,1006,224,614,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,629,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,107,677,226,224,1002,223,2,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226];
//var day2Input_changed = [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,2,19,6,23,1,23,5,27,1,9,27,31,1,31,10,35,2,35,9,39,1,5,39,43,2,43,9,47,1,5,47,51,2,51,13,55,1,55,10,59,1,59,10,63,2,9,63,67,1,67,5,71,2,13,71,75,1,75,10,79,1,79,6,83,2,13,83,87,1,87,6,91,1,6,91,95,1,10,95,99,2,99,6,103,1,103,5,107,2,6,107,111,1,10,111,115,1,115,5,119,2,6,119,123,1,123,5,127,2,127,6,131,1,131,5,135,1,2,135,139,1,139,13,0,99,2,0,14,0];
//findCalculatedIndex0(examplePart2_1, 9);
var  inputPart1 = day5Input.slice(0);
var output_part2 = findCalculatedIndex0(day5Input, 5);
var output_part1 = findCalculatedIndex0(inputPart1, 1);

console.log("Answer to day5 ---> Part 1 for input 1 --> " + output_part1[output_part1.length - 1]);
console.log("Answer to day5 ---> Part 2 for input 5 --> " + output_part2[output_part2.length - 1]);

// for(var noun = 0; noun < 100; noun++) {
//     var breakWithSuccess = false;
//   for( var verb = 0; verb < 100; verb++){
//     var inputArray = day2Input.slice(0);
//     inputArray[1] = noun;
//     inputArray[2] = verb;
//    // console.log(inputArray);
//     var position0Value = findCalculatedIndex0(inputArray)
//  //   console.log(position0Value);
//     if(position0Value === 19690720){
//         console.log("answer to second part");
//         console.log(100 * noun + verb);
//         breakWithSuccess = true;
//         break;
        
//     }

//   }
//   if(breakWithSuccess) {
//       break;
//   }
// }



    // finalOutput[1] = 12;
    // finalOutput[2] = 2;

    // var arr = finalOutput;
    // for(var indx = 0; indx < arr.length; indx = indx + 4){
    //     console.log("at index ---- " + indx);
    //     var el = arr[indx];
    //     output = processInput(arr, el, arr[indx + 1], arr[indx + 2], arr[indx + 3]);
    //     arr = output.result;
    //     if(output.stop) {
    //         finalOutput = arr;
    //         break;
    //     }
    // }    
   
    
//console.log(finalOutput);
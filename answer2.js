// Answer 2 for the https://adventofcode.com/2019/day/2
const startDate = new Date();
var day2Input = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 6, 19, 2, 19, 6, 23, 1, 23, 5, 27, 1, 9, 27, 31, 1, 31, 10, 35, 2, 35, 9, 39, 1, 5, 39, 43, 2, 43, 9, 47, 1, 5, 47, 51, 2, 51, 13, 55, 1, 55, 10, 59, 1, 59, 10, 63, 2, 9, 63, 67, 1, 67, 5, 71, 2, 13, 71, 75, 1, 75, 10, 79, 1, 79, 6, 83, 2, 13, 83, 87, 1, 87, 6, 91, 1, 6, 91, 95, 1, 10, 95, 99, 2, 99, 6, 103, 1, 103, 5, 107, 2, 6, 107, 111, 1, 10, 111, 115, 1, 115, 5, 119, 2, 6, 119, 123, 1, 123, 5, 127, 2, 127, 6, 131, 1, 131, 5, 135, 1, 2, 135, 139, 1, 139, 13, 0, 99, 2, 0, 14, 0];

function processInput(arr, op, para1, para2, position) {
    var stop = false;
    if (op === 1) {
        arr[position] = arr[para1] + arr[para2];
    } else if (op === 2) {
        arr[position] = arr[para1] * arr[para2];
    } else if (op === 99) {
        stop = true;
    } else {
        console.log("error");
        throw (new Error("invalid input"));
    }
    return {
        result: arr,
        stop: stop
    };
}

function findCalculatedIndex0(day2Input_changed) {
    var arr = day2Input_changed;
    var finalOutput = [];
    try {
        for (var indx = 0; arr && !!arr.length && indx < arr.length; indx = indx + 4) {
            var el = arr[indx];
            output = processInput(arr, el, arr[indx + 1], arr[indx + 2], arr[indx + 3]);
            arr = output.result;
            if (output.stop) {
                finalOutput = arr;
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return finalOutput[0];
}
var part1ProcessingInput = day2Input.slice(0);
part1ProcessingInput[1] = 12;
part1ProcessingInput[2] = 1;
// console.log(inputArray);
var position0Value = findCalculatedIndex0(part1ProcessingInput)
console.log("Answer to the first part " + position0Value);

for (var noun = 0; noun < 100; noun++) {
    var breakWithSuccess = false;
    for (var verb = 0; verb < 100; verb++) {
        var inputArray = day2Input.slice(0);
        inputArray[1] = noun;
        inputArray[2] = verb;
        var position0Value = findCalculatedIndex0(inputArray)
      if (position0Value === 19690720) {
            console.log("Answer to the second part " + (100 * noun + verb));
            const endDate = new Date();
            console.log("Time Taken is " + (endDate - startDate) + " ms");
            breakWithSuccess = true;
            break;
        }
    }
    if (breakWithSuccess) {
        break;
    }
}
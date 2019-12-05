//const lowerRange = 456788;
const lowerRange = 359282;
// const higherRange = 456790;
const higherRange = 820401;
let count = 0;

function isValidPassword(input) {
    const splitO = input.toString();
    let presentAdjancent = false;
    let sequenceTrue = true;
    let ar = splitO;
    var adjacentDigits = {};
    for (var indx = 0; indx < splitO.length; indx++) {
        var dg = ar[indx];
        if ((!!ar[indx - 1] && dg === ar[indx - 1]) || (!!ar[indx + 1] && dg === ar[indx + 1])) {
            presentAdjancent = true;
            adjacentDigits[dg] = (!adjacentDigits[dg] ? 0 : adjacentDigits[dg]) + 1;
            // break;
        }
        if ((!!ar[indx - 1] && dg < ar[indx - 1]) || (!!ar[indx + 1] && dg > ar[indx + 1])) {
            sequenceTrue = false;
            break;
        }
    }
    var doubleDigitPresence = Object.values(adjacentDigits).filter(el => el === 2).length > 0;
    if (presentAdjancent && sequenceTrue) {
        count++;
    }
    return presentAdjancent && sequenceTrue && doubleDigitPresence;
}
var answerArray = [];
for (var k = lowerRange; k < higherRange + 1; k++) {
    if (isValidPassword(k)) {
        answerArray.push(k);
    }
}
console.log("first answer");
console.log(count);
console.log("second answer");
console.log(answerArray.length);
console.log("Day 12");
const foundSetArray = [new Set([]), new Set([]), new Set([])];
const dimensionSet = [0, 1, 2];
let satPositions = [
    [13, -13, -2],
    [16, 2, -15],
    [7, -18, -12],
    [-3, -8, -8]
];
satPositions = satPositions.map(el => el.concat([0, 0, 0]));
let input1 = satPositions.slice(0);
console.log(satPositions);

function step(arrInput) {
    
    dimensionSet.forEach(dim => {
        arrInput = calculateVelocity(arrInput, dim);
    });
    dimensionSet.forEach(dim => {
        arrInput = calculateNextStep(arrInput, dim);
    });
    return arrInput;
}

function calculateVelocity(arrInput, dimension) {
    return arrInput.map((el, _, arr) => {
        const smallValues = arr.filter((fel) => fel[dimension] < el[dimension]).length;
        const biggervalues = arr.filter((fel) => fel[dimension] > el[dimension]).length;
        el[3 + dimension] = el[3 + dimension] + biggervalues - smallValues;
        return el;
    })
}

function calculateNextStep(arrInput, dimension) {
    return arrInput
        .map((el) => {
            el[dimension] = el[dimension] + el[3 + dimension];
            return el;
        });
}

function buildString(array, axis) {
    let result = "";
    array.forEach((el) => {
        result = result + el[axis].toString() + el[axis + 3].toString();
    });
    return result;
}
const found = [0, 0, 0];
for (let ij = 0; ij < 1000; ij++) {
    input1 = step(input1);
}
const totalen = input1.map(el => {
    return el.slice(0,3).reduce((a,b) => { return Math.abs(a) + Math.abs(b) }) * el.slice(3,6).reduce((a,b) => { return Math.abs(a) + Math.abs(b) }); 
}).reduce((a,b) => {return a + b;})

console.log("Answer to First Part --> " + totalen);

/// second part 

for (let i = 0;; i++) {
    dimensionSet.forEach(indx => {
        const strPos = buildString(satPositions, indx);
        if (foundSetArray[indx].has(strPos) && !found[indx]) {
            found[indx] = i;
        }
        if (!found[indx]) {
            foundSetArray[indx].add(strPos);
        }
    });
    if (!found.filter(el => el <= 0).length) {
        break;
    }
    satPositions = step(satPositions);
}

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);
console.log("Answer to the second part --> " + found.reduce(lcm));
// Answer 1 for the https://adventofcode.com/2019/day/1
var fs = require("fs");

function moduleAnswer1() {

const startDate = new Date();
function getText(inputFile) {
    // read text from file
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

function getModulesAndMasses(textInput) {
    var arrayOfMOdulesMass = textInput.split(/\r?\n/g);
    var fuelsArray = arrayOfMOdulesMass.map(mass => getFuelForModule(mass));
    var totalFuel = fuelsArray.reduce((a, b) => a + b);
    console.log("Total Fuel (Part 1) " + totalFuel);
    var fuelsArray = arrayOfMOdulesMass.map(mass => getEffectiveFuel(mass));
    var totalFuel = fuelsArray.reduce((a, b) => a + b);
    console.log("Total Effective Fuel (Part 2) " + totalFuel);
    const endDate = new Date();
    console.log("Time Taken is " + (endDate - startDate) + " ms");
}

function getFuelForModule(mass) {
    return !mass ? 0 : (Math.floor((mass / 3)) - 2);
}

function getEffectiveFuel(mass) {
    var fuelMass = getFuelForModule(mass);
    if (!fuelMass || fuelMass < 0) {
        return 0;
    } else {
        return fuelMass + getEffectiveFuel(fuelMass);
    }
}

function run(inpFile) {
    getText(inpFile).then(getModulesAndMasses).catch(console.error);
}


run('input1.txt');

}
module.exports = moduleAnswer1;

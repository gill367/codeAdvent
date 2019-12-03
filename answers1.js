function getText(){
    // read text from URL location
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open('GET', 'https://adventofcode.com/2019/day/1/input', true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("text") !== 1) {
                    resolve(request.responseText);
                }
            }
        }
    });
    
}

function getModulesAndMasses(textInput) {
    var arrayOfMOdulesMass = textInput.split(/\r?\n/g);
    
    console.log(arrayOfMOdulesMass)
    var fuelsArray = arrayOfMOdulesMass.map(mass => getFuelForModule(mass));
    
    console.log(fuelsArray);
    var totalFuel = fuelsArray.reduce((a,b) => a + b);
    document.getElementById("body").innerHTML+= "Total Fuel " + totalFuel;

    console.log(arrayOfMOdulesMass)
    var fuelsArray = arrayOfMOdulesMass.map(mass => getEffectiveFuel(mass));
    
    console.log(fuelsArray);
    var totalFuel = fuelsArray.reduce((a,b) => a + b);
    document.getElementById("body").innerHTML+= "<br> and Total Effective Fuel " + totalFuel;
    console.log(totalFuel);
}

function getFuelForModule(mass){
    return !mass ? 0 : (Math.floor(( mass / 3 )) - 2);

}

function getEffectiveFuel(mass) {
    var fuelMass = getFuelForModule(mass);
    if(!fuelMass || fuelMass < 0 ) {
        return 0;
    } else {
        return fuelMass + getEffectiveFuel(fuelMass);
    }
}






var textInput = getText().then(getModulesAndMasses);
//console.log(textInput);


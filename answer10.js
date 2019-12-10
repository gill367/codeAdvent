console.log("Day 8 ---");
var fs = require("fs");

function getText(inputFile) {
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

function calculateAngle(ast, laser) {
    const angle = Math.atan2(ast.x - laser.x, laser.y - ast.y);
    return (angle >= 0 ? angle : (2 * Math.PI + angle)) * 360 / (2 * Math.PI);
}

function calculateDistance(ast, src) {
    return Math.abs((src.y - ast.y)) + Math.abs((src.x - ast.x));
}


function calculateVisibleAstr(astEl, _, astCollection) {
    const visibleAstrs = [];
    astCollection.filter(astCel => astCel.astPresent && !(astCel.x === astEl.x && astCel.y === astEl.y)).map((astCollEl, indx, arr) => {
        if (astCollEl.astPresent) {
            const distance = calculateDistance(astCollEl, astEl);;
            const angle = calculateAngle(astCollEl, astEl);
            const alreadyDefined = visibleAstrs.findIndex(astAlready => astAlready.angle === angle);
            if (alreadyDefined === -1) {
                visibleAstrs.push({
                    ast: astCollEl,
                    distance: distance,
                    angle: angle
                });
            } else if (distance < visibleAstrs[alreadyDefined]["distance"]) {
                visibleAstrs[alreadyDefined] = {
                    ast: astCollEl,
                    distance: distance,
                    angle: angle
                };
            }
        }
    });
    astEl["visibleAstrs"] = visibleAstrs;
    return astEl;
}

function getArrayOfInputs(data) {
    var setOfInput = data.toString().split('\r\n');
    const mappedSetOfInput = setOfInput.map((el, indx) => {
        var mappedOutput = el.split('').map((ast, indxy) => {
            return {
                astPresent: ast === '#' ? true : false,
                x: indxy,
                y: indx
            }
        })
        return mappedOutput;
    });
    return mappedSetOfInput;
}


function processInput(getdestroyedAstatPosition, data) {
    /* first part */
    const mappedSetOfInput = getArrayOfInputs(data);  
    let finalLinearArray = [];
    mappedSetOfInput.forEach(arrIn => {
        finalLinearArray = finalLinearArray.concat(arrIn);
    })

    let finalArray = finalLinearArray.filter(el => el.astPresent).map(calculateVisibleAstr);


    finalArray = finalArray.sort((a, b) => {
        return b.visibleAstrs.length - a.visibleAstrs.length;
    });

    console.log("Answer to first part -->");
    console.log(finalArray[0].visibleAstrs.length);


    /*  --- Second part */
    let vaporisedAsts = [];
    let laserPosition = finalArray[0];
    while (true) {

        let visibleAsstRecalc = calculateVisibleAstr(laserPosition, 0, finalLinearArray).visibleAstrs.sort((a, b) => {
            return a.angle - b.angle;
        });;
      
        vaporisedAsts = vaporisedAsts.concat(visibleAsstRecalc);

        finalLinearArray = finalLinearArray.map((fel) => {
            const visibleAst = visibleAsstRecalc.find((vel) => {
                return vel.ast.x === fel.x && vel.ast.y === fel.y;
            });
            if (visibleAst) {
                fel.astPresent = false;
            }
            return fel;
        })

        if (finalLinearArray.filter((fel) => fel.astPresent).length === 1) {
            console.log("Answer to second part -->");
            console.log(vaporisedAsts[getdestroyedAstatPosition - 1].ast.x * 100 + vaporisedAsts[ getdestroyedAstatPosition- 1].ast.y);
            break;
        }
    }
}

function run(inputFile, getdestroyedAstatPosition) {
    getText(inputFile).then(processInput.bind(this, getdestroyedAstatPosition));
}
run('input10.txt', 200);
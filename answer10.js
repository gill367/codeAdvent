console.log("Day 10 ---");
var fs = require("fs");
var colors = require("colors");

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

function printAstMap(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition) {
    return new Promise((resolve, reject) => {
        var row = "";
        var previous = "";
           finalLinearArray.forEach((fla, findx) => {
                if(previous && previous.y !== fla.y) {
                    row = row + "\r\n";
                }
                previous = fla;
                var flag = !!vaporisedAsts[getdestroyedAstatPosition - 1] && vaporisedAsts[getdestroyedAstatPosition - 1].ast.x === fla.x  
                             && vaporisedAsts[getdestroyedAstatPosition - 1].ast.y === fla.y ? true : false;
                row = row + (fla.astPresent ? fla.x === laserPosition.x && fla.y === laserPosition.y ? ' X '.green.bold : ' # '.white: fla.destoryed ?  
                              flag ? ' A '.red.bold :' . ' : '   ');

                                //    console.log('--------------------------------------------------------------------');
        
    
           });

           setTimeout(() => {
            console.clear();
            console.log(row);
             //  printProgress(row);
        //      console.log('--------------------------------------------------------------------');
              resolve(true);
        }, 50);
      
      
    });
    
      

}
 function processAndPrint(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition) {
    printAstMap(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition).then(async () => {
        let visibleAsstRecalc = calculateVisibleAstr(laserPosition, 0, finalLinearArray).visibleAstrs.sort((a, b) => {
            return a.angle - b.angle;
        });;
      
        vaporisedAsts = vaporisedAsts.concat(visibleAsstRecalc);

        // finalLinearArray = finalLinearArray.map((fel, indx, arr) => {
        //     const visibleAst = visibleAsstRecalc.find((vel) => {
        //         return vel.ast.x === fel.x && vel.ast.y === fel.y;
        //     });
        //     if (visibleAst) {
        //         fel.astPresent = false;
        //         fel.destoryed = true;
        //     }
        //     return fel;
        // })
     //   const finalLinearArray1 = [];
        // for(indx1 = 0; indx1 < finalLinearArray.length; indx1++) {
        //     const fel = finalLinearArray[indx1];
        //     const visibleAst = visibleAsstRecalc.find((vel) => {
        //         return vel.ast.x === fel.x && vel.ast.y === fel.y;
        //     });
        //     if (visibleAst) {
        //         fel.astPresent = false;
        //         fel.destoryed = true;
        //         finalLinearArray[indx1] = fel;
        //         await printAstMap(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition);
        //     }
            


        // }

        for(var indx1 = 0; indx1< visibleAsstRecalc.length; indx1++) {
            const fel = visibleAsstRecalc[indx1];
            const visibleAstIndex = finalLinearArray.findIndex((vel) => {
                return vel.x === fel.ast.x && vel.y === fel.ast.y;
            });
            if (visibleAstIndex !== -1) {
                finalLinearArray[visibleAstIndex].astPresent = false;
                finalLinearArray[visibleAstIndex].destoryed = true;
              //  finalLinearArray[indx1] = fel;
                await printAstMap(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition);
            }
        }
        
        if (finalLinearArray.filter((fel) => fel.astPresent).length === 1) {
            printAstMap(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition).then(() => {
                console.log("Answer to second part -->");
                console.log(vaporisedAsts[getdestroyedAstatPosition - 1].ast.x * 100 + vaporisedAsts[ getdestroyedAstatPosition- 1].ast.y);
                breakit = true;
              //  break;
            });
            
        } else {
            processAndPrint(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition);
        }
    });
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
   // var breakit = false;
    let vaporisedAsts = [];
    let laserPosition = finalArray[0];
    processAndPrint(finalLinearArray, laserPosition, vaporisedAsts, getdestroyedAstatPosition)
    // while (!breakit) {
         
        
 
    // }
}

function run(inputFile, getdestroyedAstatPosition) {
    getText(inputFile).then(processInput.bind(this, getdestroyedAstatPosition));
}
run('input10.txt', 200);
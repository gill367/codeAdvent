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

function calculateVisibleAstr(astEl, indxAst, astCollection) {
    const parentX = astEl.x;
    const parentY = astEl.y;
    let plusY =  -1;
    let plusX = -1  ;
    let minusX = -1 ;
    let minusY = -1; // = astEl.y;  
    // let plusX = astEl.x;
    // let minusY = astEl.y;
    // let minusX = astEl.x;
    const calculatedVisiblitySet = [];
    const nonDiagonalAst = [];
 
    astCollection.filter(astCel => astCel.astPresent && !(astCel.x === parentX && astCel.y === parentY) ).map((astCollEl, indx, arr) => {
       if(astCollEl.astPresent) {
                    const distance = Math.abs((parentY - astCollEl.y)) + Math.abs((parentX - astCollEl.x));
                    let angle = Math.atan2( (astCollEl.x - parentX) , parentY - astCollEl.y ) ;
                    angle = (angle >= 0 ? angle : (2*Math.PI + angle)) * 360 / (2*Math.PI)
            if(astCollEl.x === parentX && astCollEl.y > parentY && (plusY === -1 || (astCollEl.y < plusY)) ) {
                plusY = astCollEl.y;
                nonDiagonalAst[0] = {ast:astCollEl, quadarent: "LL", distance: distance, angle: angle};
            } else  if(astCollEl.x === parentX && astCollEl.y < parentY && (minusY === -1 || ( astCollEl.y > minusY))) {
                minusY = astCollEl.y;
                nonDiagonalAst[1] = {ast:astCollEl, quadarent: "UR", distance: distance, angle: angle};
            } else  if(astCollEl.y === parentY && astCollEl.x > parentX && (plusX === -1 || (astCollEl.x < plusX)) ) {
                plusX = astCollEl.x;
                nonDiagonalAst[2] = {ast:astCollEl, quadarent: "LR", distance: distance, angle: angle};
            } else  if(astCollEl.y === parentY && astCollEl.x < parentX && (minusX === -1 || ( astCollEl.x > minusX))) {
                minusX = astCollEl.x;
                nonDiagonalAst[3] = {ast:astCollEl, quadarent: "UL", distance: distance, angle: angle};
            } else if(astCollEl.x !== parentX && astCollEl.y !== parentY){
                const linearity = ((parentY - astCollEl.y) / (parentX - astCollEl.x));
                const quadarent = astCollEl.y > parentY   ? astCollEl.x > parentX   ? "LR" : "LL" : astCollEl.x > parentX  ? "UR" : "UL";
                
                let alreadyDefined = calculatedVisiblitySet.findIndex(astAlready => {
                    return astAlready.linearity === linearity && quadarent === astAlready.quadarent;
                });
                if(alreadyDefined === -1) {
                    calculatedVisiblitySet.push({ast:astCollEl, linearity: linearity, quadarent: quadarent, distance: distance, angle: angle});
                } else if(distance < calculatedVisiblitySet[alreadyDefined]["distance"]){
                    calculatedVisiblitySet[alreadyDefined] = {ast:astCollEl, linearity: linearity, quadarent: quadarent, distance: distance, angle: angle};
                   
                }
            }

           

       }
    });

    return {
         x: parentX,
         y:parentY,
         count: nonDiagonalAst.filter((el => !!el)).length + calculatedVisiblitySet.length,
         nonDiagonalAst: nonDiagonalAst.filter((el => !!el)),
         calculatedVisiblitySet: calculatedVisiblitySet

    }


}

function getArray(data) {
 var setOfInput = data.toString().split('\r\n');
 const mappedSetOfInput = setOfInput.map((el, indx) =>  {
     var mappedOutput = el.split('').map((ast, indxy) => {
         return {
             astPresent: ast === '#' ? true: false,
             x: indxy,
             y: indx
         }
     })
     return mappedOutput;
 });
// console.log(mappedSetOfInput);


let finalLinearArray = [];
mappedSetOfInput.forEach(arrIn => {
    finalLinearArray =  finalLinearArray.concat(arrIn);
})
//console.log(finalLinearArray);
let finalArray = finalLinearArray.filter(el => el.astPresent).map(calculateVisibleAstr);
// finalArray.forEach(el => {
//     console.log(el.x + "," + el.y + " -  "  );
//     el.nonDiagonalAst.forEach(ndEl => {console.log( JSON.stringify(ndEl))});
//     el.calculatedVisiblitySet.forEach(ndEl => {console.log( JSON.stringify(ndEl))});

//   //  el.calculatedVisiblitySet.forEach(ndEl => {console.log(ndEl.toString());});
// })

finalArray = finalArray.sort((a,b) => {
 return b.count - a.count;
});
console.log(finalArray[0].x + " " + finalArray[0].y);




  let vaporisedAsts = [];
 let breakit = false;
 let laserPosition = finalArray[0];
 while(!breakit) {
     
 let finalArrayRecalc = calculateVisibleAstr(laserPosition, 0, finalLinearArray);//finalLinearArray.filter(el => el.astPresent).map(calculateVisibleAstr);
//  finalArrayRecalc = finalArrayRecalc.sort((a,b) => {
//     return b.count - a.count
//    });
  
 let visibleAsstRecalc = finalArrayRecalc.nonDiagonalAst.concat(finalArrayRecalc.calculatedVisiblitySet);
 visibleAsstRecalc = visibleAsstRecalc.sort((a,b) => {
    return a.angle - b.angle;
});

//visibleAsstRecalc.forEach(ndEl => {console.log( JSON.stringify(ndEl))});
vaporisedAsts = vaporisedAsts.concat(visibleAsstRecalc);
finalLinearArray = finalLinearArray.map((fel) => {
    const visibleAst = visibleAsstRecalc.find((vel) => {
          return vel.ast.x === fel.x && vel.ast.y === fel.y;
    });
    if(visibleAst) {
        fel.astPresent = false;
    }
    return fel;
})
 //let laserPosition = finalArrayRecalc[0];


// let reaslignedvisibleAsstRecalc = visibleAsstRecalc.filter(vAR => {
//            return vAR.x === laserPosition
// });
if(finalLinearArray.filter((fel) => fel.astPresent).length === 1) {
    console.log(vaporisedAsts[199]);
    break;
}


}

}
function run(inputFile) {
    getText(inputFile).then(getArray.bind(this));
}
run('input10.txt');
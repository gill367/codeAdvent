console.log("answer12");
var xset = new Set([]);
var yset = new Set([]);
var zset = new Set([]);
var pxset = new Set([]);
var pyset = new Set([]);
var pzset = new Set([]);
// {x:13, y:-13, z:-2},
// {x:16, y:2, z:-15},
// {x:7, y:-18, z:-12},
// {x:-3, y:-8, z:-8},

// {x:-1, y:0, z:2, px: 0, py: 0, pz: 0},
// {x:2, y:-10, z:-7, px: 0, py: 0, pz: 0},
// {x:4, y:-8, z:8, px: 0, py: 0, pz: 0},
// {x:3, y:5, z:-1, px: 0, py: 0, pz: 0}
var satPositions = [{sat:1, x:13, y:-13, z:-2, px: 0, py: 0, pz: 0},
    {sat:2, x:16, y:2, z:-15, px: 0, py: 0, pz: 0},
    {sat:3, x:7, y:-18, z:-12, px: 0, py: 0, pz: 0},
    {sat:4, x:-3, y:-8, z:-8, px: 0, py: 0, pz: 0}];


function calculateVelocity(arrInput, dimension) {

    // var sortedArray = arrInput.sort((a,b) => {
    //     return b[dimension] - a[dimension];

    // });

   return arrInput.map((el, _, arr) => {
       var smallValues = arr.filter((fel) => fel[dimension] < el[dimension]).length;
       var biggervalues = arr.filter((fel) => fel[dimension] > el[dimension]).length;
       el["p"+ dimension] =  el["p"+ dimension] + biggervalues - smallValues;
    
       return el;
   })
}

function calculateNextStep(arrInput, dimension) {
 
    return arrInput.map((el) => {
        el[dimension] = el[dimension] +  el["p"+ dimension] ;
       
          
        
        return el;
    });
    
 

}

function generateStringCode(arrInput) {
   var stringCode = '';
   arrInput.forEach(el => {
        stringCode = stringCode+"-"+el.sat+"-"+el.x+"-"+el.y+"-"+el.z+"-"+el.px+"-"+el.py+"-"+el.pz;
   })
   return stringCode;


}      

var strinArray = [];
console.log(satPositions);

var stringForInput0 = generateStringCode(satPositions);
var flagx, flagy, flagz;
var flagpx, flagpy, flagpz;
for(var i = 0;  ; i ++){
    if(i % 100000 === 0) {
   
 console.log(i);
    }


var pxpos = satPositions[0].px +"-"+satPositions[1].px+"-"+satPositions[2].px+"-"+satPositions[3].px;
var pypos = satPositions[0].py +"-"+satPositions[1].py+"-"+satPositions[2].py+"-"+satPositions[3].py;
var pzpos = satPositions[0].pz +"-"+satPositions[1].pz+"-"+satPositions[2].pz+"-"+satPositions[3].pz;
var xpos = satPositions[0].x +"-"+satPositions[1].x+"-"+satPositions[2].x+"-"+satPositions[3].x + "-" + pxpos;
var ypos = satPositions[0].y +"-"+satPositions[1].y+"-"+satPositions[2].y+"-"+satPositions[3].y + "-" + pypos;
var zpos = satPositions[0].z +"-"+satPositions[1].z+"-"+satPositions[2].z+"-"+satPositions[3].z + "-" + pzpos;

if(xset.has(xpos) && !flagx ){
    
    console.log("x-" + i);
    flagx = i;
    console.log(satPositions);
}
if(yset.has(ypos) && !flagy ){
    
    console.log("y-" + i);
    flagy= i;
    console.log(satPositions);
}
if(zset.has(zpos) && !flagz ){
    
    console.log("z-" + i);
    flagz = i;
    console.log(satPositions);
}

if(pxset.has(pxpos)&& !flagpx  ){
    
    console.log("px-" + i);
    flagpx = i;
    console.log(satPositions);
}
if(pyset.has(pypos) && !flagpy){
    
    console.log("py-" + i);
    flagpy = i;
    console.log(satPositions);
}
if(pzset.has(pzpos) && !flagpz ){
    
    console.log("pz-" + i);
    flagpz = i;
    console.log(satPositions);
}

if(flagx && flagy && flagz) 
    {
    break;
}



if(!flagx){
    xset.add(xpos);
}
if(!flagy){
yset.add(ypos);
}
if(!flagz){
zset.add(zpos);
}
if(!flagpx){
    pxset.add(pxpos);
}
if(!flagpy){
pyset.add(pypos);
}
if(!flagpz){
pzset.add(pzpos);
}


var stringForInput = generateStringCode(satPositions);



if(stringForInput === stringForInput0 && i !== 0){
    console.log(i);
    break;
}

["x","y","z"].forEach(dim => {
  
satPositions = calculateVelocity(satPositions, dim);



});

["x","y","z"].forEach(dim => {
  
    satPositions = calculateNextStep(satPositions, dim);
   
    
    
    });




}


var kineArray = satPositions.map(el => {
    return ((Math.abs(el.x) + Math.abs(el.y) + Math.abs(el.z))  * (Math.abs(el.px) + Math.abs(el.py) + Math.abs(el.pz)));
})



var potArray = satPositions.map(el => {
    return Math.abs(el.px) + Math.abs(el.py) + Math.abs(el.pz);
})
var totalen = 0
kineArray.forEach(kel => {
    totalen = totalen + kel;
});


console.log(satPositions);
console.log(kineArray);
console.log(potArray);
console.log(totalen);


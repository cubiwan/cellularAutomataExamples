/*************************************
 * 
 *  Vars
 * 
*************************************/

var world;
var worldStarted = false;
var config = {};


/*************************************
 * 
 *  Colors
 * 
*************************************/


var colors = [];  
colors[0] = "0,0,0,1" //black
colors[1] = "255,255,255,1" //white
colors[2] = "255,0,0,1" //red
colors[3] = "0,0,255,1" //blue
colors[4] = "0,255,0,1" //lime
colors[5] = "255,255,0,1" //yellow
colors[6] = "255,0,255,1" //fucsia
colors[7] = "0,255,255,1" //cyan
colors[8] = "255,128,0,1" //orange
colors[9] = "160,160,160,1" //gray
colors[10] = "128,0,0,1" //maroon
colors[11] = "0,0,128,1" //navy
colors[12] = "0,128,0,1" //green
colors[13] = "128,128,0,1" //gold
colors[14] = "128,0,128,1" //purple
colors[15] = "0,128,128,1" //teal
colors[16] = "128,64,0,1" //brown

colors[true] = "255,255,255,1" //white
colors[false] = "0,0,0,1" //black

var red = [];
red[0] = "115,0,0,1";
red[1] = "135,0,0,1";
red[2] = "155,0,0,1";
red[3] = "175,0,0,1";
red[4] = "195,0,0,1";
red[5] = "215,0,0,1";
red[6] = "235,0,0,1";
red[7] = "255,0,0,1";

var green = [];
green[0] = "115,0,0,1";
green[1] = "135,0,0,1";
green[2] = "155,0,0,1";
green[3] = "175,0,0,1";
green[4] = "195,0,0,1";
green[5] = "215,0,0,1";
green[6] = "235,0,0,1";
green[7] = "255,0,0,1";

var gray = [];
gray[0] = "0,0,0,1";
gray[1] = "70,70,70,1";
gray[2] = "100,100,100,1";
gray[3] = "130,0,0,1";
gray[4] = "160,0,0,1";
gray[5] = "190,0,0,1";
gray[6] = "215,0,0,1";
gray[7] = "255,255,255,1";

var blue = [];
blue[0] = "0,0,115,1";
blue[1] = "0,0,135,1";
blue[2] = "0,0,155,1";
blue[3] = "0,0,175,1";
blue[4] = "0,0,195,1";
blue[5] = "0,0,215,1";
blue[6] = "0,0,235,1";
blue[7] = "0,0,255,1";

var rb = [];
rb[-8] = "255,0,0,1";
rb[-7] = "235,0,0,1";
rb[-6] = "215,0,0,1";
rb[-5] = "195,0,0,1";
rb[-4] = "175,0,0,1";
rb[-3] = "155,0,0,1";
rb[-2] = "135,0,0,1";
rb[-1] = "115,0,0,1";
rb[0] = "0,0,0,1";
rb[1] = "0,0,115,1";
rb[2] = "0,0,135,1";
rb[3] = "0,0,155,1";
rb[4] = "0,0,175,1";
rb[5] = "0,0,195,1";
rb[6] = "0,0,215,1";
rb[7] = "0,0,235,1";
rb[8] = "0,0,255,1";

const DARK = 8;

const BLACK = 0;
const WHITE = 1;
const RED = 2;
const BLUE = 3;
const LIME = 4;
const YELLOW = 5;
const FUCSIA = 6;
const CYAN = 7;
const ORANGE = 8;
const GRAY = 9;
const MAROON = 10;
const NAVY = 11;
const GREEN = 12;
const GOLD = 13;
const PURPLE = 14;
const TEAL = 15;
const BROWN = 16;




/*************************************
 * 
 *  User Interface
 * 
*************************************/

var statusbar = [];
var toolbar = [];

function uiCreateToolbar(){
    document.body.innerHTML += '<div id="toolbar"></div>';
}

function uiAddButton(id, text, onclick){
    toolbar.push({id:id, text:text, onclick:onclick});
}

function uiAddLabel(id, text){
    toolbar.push({id:id, text:text});
}

function uiUpdateToolbar(){
    var toolbarHTML = ""        
    for(var i = 0; i < toolbar.length; ++i){
        if(toolbar[i].onclick){
            toolbarHTML += '<button id="'+toolbar[i].id+'" onclick="'+toolbar[i].onclick+'">'+toolbar[i].text+'</button>';
        } else {
            toolbarHTML += '<span id="'+toolbar[i].id+'">'+toolbar[i].text+'</button>';
        }
    }    
    document.getElementById("toolbar").innerHTML = toolbarHTML;
}




function uiCreateStatusbar(){
    document.body.innerHTML += '<div id="statusbar"></div>';
}

function uiAddStatusbar(name, valueOf){
    statusbar.push({name:name, valueOf:valueOf});
}

function uiUpdateStatusbar(){
    var statusHTML = "<h4>"        
    for(var i = 0; i < statusbar.length; ++i){
        statusHTML +=  statusbar[i].name+": "+config[statusbar[i].valueOf]+"&nbsp;&nbsp;&nbsp;";
    }    
    statusHTML += "</h4>"
    document.getElementById("statusbar").innerHTML = statusHTML;
}

function play(i){
    if(!world){
        reload();
    }
    if(i) {
        world.animate(i);
    } else {
        world.animate();
    }
}

function reload(){
    if(world){
        world.destroy();
    }
    worldStarted = false;
    world = new terra.Terrarium(config.size, config.size, config);
    makeGrid();
    worldStarted = true;    
    uiUpdateStatusbar();
}

function makeGrid(){
    world.grid = world.makeGrid(config.grid);
}

uiAddButton("playButton", "Play", "play()");
uiAddButton("stopButton", "Stop", "world.stop()");
uiAddButton("stepButton", "Step", "play(1)");
uiAddButton("reloadButton", "Reload", "reload()");   

window.onload = function() {
    uiCreateToolbar();
    uiCreateStatusbar();
    uiUpdateToolbar();
    uiUpdateStatusbar();
};


















function withProbability(p, valueP, valueNoP){
    if(Math.random() < p){
        return valueP
    } else {
        return valueNoP;
    }
}

function intRandom(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function neighborRandom(neighbors){
    var index = intRandom(0, neighbors.length-1);
    return neighbors[index];
}

//Counts how many neighbors has property equals to value
function neighborsCount(neighbors, property, value){
    var number = 0;
    for(var i = 0; i < neighbors.length; ++i){
        if(neighbors[i].creature[property] == value){
            number++;
        }
    }
    return number;
}

//Summation neighbors property 
function neighborsSummation(neighbors, property){
    var summation = 0;
    for(var i = 0; i < neighbors.length; ++i){
        summation += neighbors[i].creature[property];
    }
    return summation;
}

//Mean neighbors property 
function neighborsMean(neighbors, property){
    return neighborsSummation(neighbors, property)/neighbors.length;
}

function neighborsHigher(neighbors, property){ 
    var maxValue = neighbors[0].creature[property];

    for(var i = 1; i < neighbors.length; ++i){
        if(neighbors[i].creature[property] > maxValue){
            maxValue = neighbors[i].creature[property];
        }
    }
    return maxValue;
}

function neighborLower(neighbors, property){  
    var minValue = neighbors[0].creature[property];

    for(var i = 1; i < neighbors.length; ++i){
        if(neighbors[i].creature[property] < minValue){
            minValue = neighbors[i].creature[property];
        }
    }
    return minValue;
}

function neighborsAndMe(neighbors, me, x, y){
    var meAsNeighbor = {creature: me, coords: {x: x, y: y}};
    var neighborsWithMe = [];
    for(var i = 0; i < neighbors.length; ++i){
        neighborsWithMe.push(neighbors[i]);
    }
    neighborsWithMe.push(meAsNeighbor);
    return neighborsWithMe;
}


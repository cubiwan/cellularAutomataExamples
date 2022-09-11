/*************************************
 * 
 *  Vars
 * 
*************************************/

var world;
var worldStarted = false;
var config = {};
config.size = 150;
config.cellSize = 5;
config.periodic = true;
config.population = config.size*config.size;
config.pixels = config.size*config.cellSize;
config.cicles = 0;


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
colors[9] = "255,192,203,1" //pink
colors[10] = "127,255,212,1" //aquamarine
colors[11] = "160,160,160,1" //gray
colors[12] = "128,0,0,1" //maroon
colors[13] = "0,0,128,1" //navy
colors[14] = "0,128,0,1" //green
colors[15] = "128,128,0,1" //gold
colors[16] = "128,0,128,1" //purple
colors[17] = "0,128,128,1" //teal
colors[18] = "128,64,0,1" //brown
colors[19] = "199,21,133,1" //violet
colors[19] = "0,206,209" //turquoise

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

const DARK = 10; // DARK_COLOR = COLOR[1-10] + DARK;  NAVY = BLUE + DARK

const BLACK = 0;
const WHITE = 1;
const RED = 2;
const BLUE = 3;
const LIME = 4;
const YELLOW = 5;
const FUCSIA = 6;
const CYAN = 7;
const ORANGE = 8;
const PINK = 9;
const AQUAMARINE = 10;
const GRAY = 11;
const MAROON = 12;
const NAVY = 13;
const GREEN = 14;
const GOLD = 15;
const PURPLE = 16;
const TEAL = 17;
const BROWN = 18;
const VIOLET = 19;
const TURQUOISE = 20;

function grayscale(v){
    return v+","+v+","+v+",1";
}

/*************************************
 * 
 *  User Interface
 * 
*************************************/
var toolbar;

function uiCreateToolbar(){
    document.body.innerHTML +=  "<div class='page'>"+
                                    "<div class='row'>"+
                                        "<div class='column1'>"+
                                            "<div id='toolbar' class='controls'>"+    
                                            "</div>"+
                                        "</div>"+                                    
                                        "<div class='column2'>"+
                                            "<div id='world' class='world'>"+
                                                "<span id='insertHere'></span>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>";


    toolbar = new Tweakpane({
        title: 'Controls',
        container: document.getElementById('toolbar')
    });

    toolbar.addButton({title: 'Play'}).on('click', () => {play()});
    toolbar.addButton({title: 'Stop'}).on('click', () => {world.stop()});
    toolbar.addButton({title: 'Step'}).on('click', () => {play(1)});
    toolbar.addButton({title: 'Reload'}).on('click', () => {reload()});
    
    toolbar.addSeparator() 

    toolbar.addInput(config, 'size', {
        label: 'Size:',
        min: 10,
        max: 400,
        step: 10   
    }).on('change', () => {
        config.population = config.size*config.size;
        config.pixels = config.size*config.cellSize;             
        reload();
    });   
    toolbar.addMonitor(config, 'population', {label: 'Population:'});

    toolbar.addInput(config, 'cellSize', {
        label: 'Cell:',
        min: 1,
        max: 10,
        step: 1   
    }).on('change', () => {
        config.pixels = config.size*config.cellSize;    
        reload();
    });      
    toolbar.addMonitor(config, 'pixels', {label: 'Width/Height(px):'});
    toolbar.addMonitor(config, 'cicles', {label: 'Cicles:'});

    toolbar.addSeparator();

    return toolbar;
}

function play(i){
    if(!world){
        reload();
    }
    if(i) {
        world.animate(i, countCicles);
    } else {
        world.animate(countCicles);
    }
}

function countCicles(){
    config.cicles++;
    eachCicle(config.cicles);
}

function reload(){    
    if(world){
        world.destroy();
    }
    config.cicles = 0;
    worldStarted = false;
    config.insertAfter = document.getElementById('insertHere'); //if doesn't exist insertAfter = null 
    world = new terra.Terrarium(config.size, config.size, config);    
    makeGrid();
    initWorld();
    worldStarted = true;
    eachCicle(0);
}

function makeGrid(){
    world.grid = world.makeGrid(config.grid);
}


function eachCicle(cicle){}

function initWorld(){}



/*************************************
 * 
 *  Probability
 * 
*************************************/


function withProbability(p, valueP, valueNoP){
    if(Math.random() < p){
        return valueP
    } else {
        return valueNoP;
    }
}

function intRandom(min, max) {  
    return Math.floor(Math.random() * ((max - min) + 1) + min);
}


/*************************************
 * 
 *  Neighbors
 * 
*************************************/

//Return a random neighbour
function neighborRandom(neighbors){
    var index = intRandom(0, neighbors.length-1);
    return neighbors[index];
}

//Return a random neighbour value
function neighborRouletteRandomValue(neighbors, property){
    return neighborRandom(neighbors).creature[property];
}

//Return a random neighbour with probability acording property value
function neighborRouletteRandom(neighbors, property){
    var summation = 0;
    for(var i = 0; i < neighbors.length; ++i){
        summation += neighbors[i].creature[property];
    }

    var rnd = intRandom(0, summation);
    summation = 0;
    for(var i = 0; i < neighbors.length; ++i){
        summation += neighbors[i].creature[property];
        if(summation >= rnd){
            return neighbors[i];
        }
    }
}

//Return a random neighbour value with probability acording property value
function neighborRouletteRandomValue(neighbors, property){
    return neighborRouletteRandom(neighbors, property).creature[property];
}

//Return neighbor with max property value 
function neighborsHigher(neighbors, property){ 
    var maxValue = neighbors[0].creature[property];
    var maxIndex = 0;

    for(var i = 1; i < neighbors.length; ++i){
        if(neighbors[i].creature[property] > maxValue){
            maxValue = neighbors[i].creature[property];
            maxIndex = i;
        }
    }
    return neighbors[maxIndex];
}

function neighborsHigherValue(neighbors, property){ 
    return neighborsHigher(neighbors, property).creature[property];
}


//Return neighbor with min property value 
function neighborLower(neighbors, property){  
    var minValue = neighbors[0].creature[property];
    var minIndex = 0;

    for(var i = 1; i < neighbors.length; ++i){
        if(neighbors[i].creature[property] < minValue){
            minValue = neighbors[i].creature[property];
            minIndex = i;
        }
    }
    return neighbors[minIndex];
}

function neighborLowerValue(neighbors, property){  
    neighborLower(neighbors, property).creature[property];
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

//Counts how many neighbors return condition as true (condition is a function)
function neighborsCondition(neighbors, condition){
    var number = 0;
    for(var i = 0; i < neighbors.length; ++i){
        if(condition(neighbors[i].creature,i)){
            number++
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

function neighborsAndMe(neighbors, me, x, y){
    var meAsNeighbor = {creature: me, coords: {x: x, y: y}};
    var neighborsWithMe = [];
    for(var i = 0; i < neighbors.length; ++i){
        neighborsWithMe.push(neighbors[i]);
    }
    neighborsWithMe.push(meAsNeighbor);
    return neighborsWithMe;
}

function getNeighborValue(neighbor, property){
    return neighbor.creature[property];
}

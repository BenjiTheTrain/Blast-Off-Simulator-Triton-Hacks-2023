// VARIABLES //

// get the center point of the canvas
var centerX = getWidth() / 2;
var centerY = getHeight() / 2;

// rocket 
var xMovement = 0; 
var yMovement = 0; 

// counter for timer 
var atmosCounter = 0;
var rocketCounter = 0; 
var groundCounter = 0;

// variables for simulation 
let enableSimulation = false; 
var distance = 0;
var burnRate = 1000;
var fuelEfficiency = 382.5;
var numDays = 0;
const daysPerKm = 127500;

var fuel = readInt("How much gallons of fuel will you pack? ")
var numAstronauts = readInt("How many astronauts will be on board? ")
var emissions = numAstronauts * 750 
var reducedEmissions = emissions *0.86 

// FUNCTIONS //

// create atmosphere layer
function createAtmosLayer(radius, startingPos, color, counterMax) {
    // CREATION
    const atmosLayer = new Circle(radius);
    atmosLayer.setPosition(200, startingPos)
    atmosLayer.setColor(color);
    
    // set movement speeds 
    yMovement = 8;
    add(atmosLayer);   

    // ANIMATION
    let timerId = setInterval(function moveAtmosLayer(){
        // move the atmosLayer continuously 
        atmosLayer.move(xMovement, yMovement);
        
        // counts the amount of seconds --> then stops when counter = 80
        atmosCounter += 1;
        if(atmosCounter >= counterMax){
            clearInterval(timerId);
            atmosCounter = 0;
        }
    }, 15)
}

// create rocket 
function createRocket(yMovement) {
    // rocket variables
    var rectWidth = 50 ;
    var rectHeight = 100 ;
    var rectTLCornerX = ((getWidth() / 2 ) - rectWidth/2) ;
    var rectTLCornerY = (getHeight()- (2.3 *rectHeight)) ;
    
    // nose
    var nose = new Polygon();
    nose.addPoint(rectTLCornerX, rectTLCornerY);
    nose.addPoint(getWidth()/2, rectTLCornerY - (rectHeight/2));
    nose.addPoint(rectTLCornerX+rectWidth, rectTLCornerY);
    nose.setColor(Color.red);
    
    //body of the rocket 
    const body = new Rectangle(rectWidth, rectHeight);
    body.setPosition(rectTLCornerX, rectTLCornerY)
    body.setColor(Color.grey);

    // window border 
    var circle1 = new Circle(rectWidth/4 + 2);
    circle1.setPosition(getWidth()/2, rectTLCornerY +  rectHeight/2);
    circle1.setColor("#3bc3d");
    
    // window glass
    var circle2 = new Circle(rectWidth/4);
    circle2.setPosition(getWidth()/2, rectTLCornerY +  rectHeight/2);
    circle2.setColor("#60e6e6");
    
    //left fin 
    var leftfin = new Polygon();
    leftfin.addPoint(rectTLCornerX,rectTLCornerY + (3 * rectHeight)/4);
    leftfin.addPoint(rectTLCornerX, rectTLCornerY + rectHeight);
    leftfin.addPoint(rectTLCornerX - rectWidth/3, 
            rectTLCornerY + (1.5 * rectHeight));
    leftfin.setColor(Color.red);
    
    //right fin 
    var rightfin = new Polygon();
    rightfin.addPoint(rectTLCornerX + rectWidth, rectTLCornerY + (3 * rectHeight)/4);
    rightfin.addPoint(rectTLCornerX + rectWidth, rectTLCornerY + rectHeight);
    rightfin.addPoint(rectTLCornerX + rectWidth + rectWidth/3, 
            rectTLCornerY + (1.5 * rectHeight));
    rightfin.setColor(Color.red);
    
    //nozzle 
    const nozzle = new Rectangle(rectWidth/2, rectHeight/16);
    nozzle.setPosition(getWidth()/2 - rectWidth/4 , rectTLCornerY + rectHeight)
    nozzle.setColor("#3b3c3d");

    // set movement speeds
    yMovement = yMovement

    //adding all rocket parts together 
    add(body);  
    add(nose)
    add(circle1);
    add(circle2);
    add(leftfin);
    add(rightfin);
    add(nozzle);
    
    // blast off!
    let timerId = setInterval(function moveRocket(){
        // move all rocket parts  
        body.move(xMovement, yMovement);
        nose.move(xMovement, yMovement);
        circle1.move(xMovement, yMovement);
        circle2.move(xMovement, yMovement);
        leftfin.move(xMovement, yMovement);
        rightfin.move(xMovement, yMovement);
        nozzle.move(xMovement, yMovement);
        
        // counter increase = moves 
        // counter stops = stops 
        rocketCounter += 1
        if (rocketCounter >= 160){
            clearInterval(timerId)
            rocketCounter = 0;
            createText("Distance:","20pt Bahnschrift", 50, 300,"white");
            createText("Fuel:", "20pt Bahnschrift", 50, 350, "white");
            createText("Days:","20pt Bahnschrift", 50, 400,"white");
            updateText(300,350,400)
        }
    }, 15)
}

function updateText(y1,y2,y3){
    var distanceText = new Text(0,"25pt Bahnschrift");
    distanceText.setPosition(185,y1);
    distanceText.setColor("white");
    add(distanceText);
    
    var fuelText = new Text(0,"25pt Bahnschrift");
    fuelText.setPosition(120,y2);
    fuelText.setColor("white");
    add(fuelText);
    
    var dayText = new Text(0,"25pt Bahnschrift");
    dayText.setPosition(130,y3);
    dayText.setColor("white");
    add(dayText);
    
    var foodText = new Text(0,"25pt Bahnschrift");
    foodText.setPosition(130,200);
    foodText.setColor("black");
    add(foodText);
    
    let timerId = setInterval(function changeText(){
        // count and hopefully stop it
        distance += fuelEfficiency ;
        fuel -= burnRate;
            
        if (distance >= daysPerKm * 7 ) {
            numDays = 7;
        } else if (distance >= daysPerKm * 6) {
            numDays = 6 ;
        } else if (distance >= daysPerKm * 5) {
            numDays = 5;
        } else if (distance >= daysPerKm * 4 ) {
            numDays = 4;
        } else if (distance >= daysPerKm * 3) {
            numDays = 3 ;
        } else if (distance >= daysPerKm * 2) {
            numDays = 2;
        } else if (distance >= daysPerKm * 1) {
            numDays = 1;
        }  else {
            numDays = 0
        }
        
        //  foodText.setText(numFood + " meals")
        distanceText.setText(distance + " km");
        fuelText.setText(fuel + " gal");
        dayText.setText(numDays + " days");
        
        if (fuel <= 0 || numDays == 7){
            clearInterval(timerId);
            
            if (fuel <= 0){
                console.log("You ran out of fuel!")
                
            } else if(numDays == 7) {
                console.log ("You survived a week!")
            }
            createText("You released " + emissions + " tonnes of CO2 into the atmosphere", 
            "10pt Bahnschrift", 40, getHeight() - 50, "white");
            createText("You would reduce " + reducedEmissions + " tonnes of CO2 using biofuels", 
            "10pt Bahnschrift", 40, getHeight() - 35, "white");
        }
    },15)
}
// create stone ground 
function createGround(yMovement){
    // create ground
    var ground = new Rectangle(getWidth(), 200);
    ground.setPosition(0, 400);
    ground.setColor("gray");
    add(ground);
    
    // set movement speed 
    yMovement = yMovement 
    
    // set timer
    let timerId = setInterval(function moveGround(){
    // move ground downwards
        ground.move(xMovement, yMovement);
    
    // count and hopefully stop it
        groundCounter += 1
        if (groundCounter >= 100){
            clearInterval(timerId)
            groundCounter = 0;
        }
    },15)
}

// create sky background
function createBackground(color){
    var background = new Rectangle(getWidth(),getHeight());
    background.setPosition(0,0);
    background.setColor(color);
    add(background);
}

// create any text
function createText(text, font, x, y, color){
    var txt = new Text(text, font);
    txt.setPosition(x, y);
    txt.setColor(color);
    add(txt);
}

// set blast off ui --> E
function setBlast(e) {
    if (e.keyCode == Keyboard.letter("E")) {
        // set background
        createBackground("#d4eff7");
        
        // calls createAtmosLayer
        createAtmosLayer(950, getHeight()/2, "black", 340); // space
        createAtmosLayer(850, getHeight()/2, "#8585c7", 620); // purple
        createAtmosLayer(750, getHeight()/2, "#c1c4f5", 605); //light purple 
        createAtmosLayer(650, getHeight()/2, "#93b1db", 580); // cyan
        createAtmosLayer(550, getHeight()/2,"#c1e7f5", 545); // light blue
        createAtmosLayer(450, getHeight()/2," #d4eff7", 490); // lightest blue
        
        // create rocket and ground --> after rocket ends, simulation starts 
        createRocket(-1);
        createGround(3);
       
    }
}

// PLAY //

// main function : play 
function play(){
    // START
    createText("BLAST OFF SIMULATOR", "25pt Bahnschrift", 25, centerY, "gray");
    createText("TO BEGIN, PRESS 'E' TO BEGIN", "13pt Bahnschrift", 75, centerY + 30, "blue");
   
    // if the user inputs E --> screen transitions to rocket building 
    keyDownMethod(setBlast);
}

// start the program : call play()
play();
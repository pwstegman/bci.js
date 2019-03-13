// Define the colors
var color1 = '#007bff';
var color2 = '#dd5145';
var currentColor = color1;

// Keep track of the two datasets for CSP
var classA = [];
var classB = [];

// Keep track of two.js points for animation
var pointsA = [];
var pointsB = [];

// Toolbar
var color1btn = document.getElementById('color1btn');
var color2btn = document.getElementById('color2btn');
var projectbtn = document.getElementById('projectbtn');
var clearbtn = document.getElementById('clearbtn');
var helpText = document.getElementById('helpText');

color1btn.addEventListener('click', function(){
    currentColor = color1;
    color1btn.classList.add('active');
    color2btn.classList.remove('active');
}, false);

color2btn.addEventListener('click', function(){
    currentColor = color2;
    color2btn.classList.add('active');
    color1btn.classList.remove('active');
}, false);

clearbtn.addEventListener('click', function(){
    container.classList.add('fadeOut');
    setTimeout(function(){
        classA = [];
        classB = [];
        pointsA = [];
        pointsB = [];
        two.clear();
        two.update();
        container.classList.remove('fadeOut');
    }, 300);
}, false);

projectbtn.addEventListener('click', function(){
    // Run CSP if we have enough data
    if(classA.length > 1 && classB.length > 1){
        var cspParams = bci.cspLearn(classA, classB);
        classA = bci.cspProject(cspParams, classA);
        classB = bci.cspProject(cspParams, classB);

        // Normalize the points so they fit on the screen
        normalizePoints(classA, classB);

        for(var i = 0; i < pointsA.length; i++){
            pointsA[i].translation.set(classA[i][0], classA[i][1]);
        }

        for(var i = 0; i < pointsB.length; i++){
            pointsB[i].translation.set(classB[i][0], classB[i][1]);
        }

        two.update();
    }
}, false);

function normalizePoints(classA, classB){
    var minx = classA[0][0];
    var miny = classA[0][1];

    var maxx = minx;
    var maxy = miny;

    classA.concat(classB).forEach(([x, y]) => {
        if(x < minx) minx = x;
        if(y < miny) miny = y;
        if(x > maxx) maxx = x;
        if(y > maxy) maxy = y;
    });

    for(var i = 0; i < classA.length; i++){
        classA[i][0] = (classA[i][0] - minx) / (maxx - minx) * two.width * 0.5 + two.width * 0.25;
        classA[i][1] = (classA[i][1] - miny) / (maxy - miny) * two.height * 0.5 + two.height * 0.25;
    }

    for(var i = 0; i < classB.length; i++){
        classB[i][0] = (classB[i][0] - minx) / (maxx - minx) * two.width * 0.5 + two.width * 0.25;
        classB[i][1] = (classB[i][1] - miny) / (maxy - miny) * two.height * 0.5 + two.height * 0.25;
    }
}

// Info text
var infoTexts = [
    'Place at least two blue and two red points',
    'Click \'Project\' to project the points using <a href="https://en.wikipedia.org/wiki/Common_spatial_pattern">common spatial pattern (CSP)</a>',
    'CSP projects the points so one color has highest variance in one axis and the other has highest variance in the other',
    'This can be used to classify signals',
    'After CSP is run, the variance along each dimension can be used to generate a feature vector for machine learning methods',
    'The log of the variance is often passed as a feature vector into LDA when classifying brainwaves',
    'This has applications in motor imagery tasks such as an imagined hand or arm movement',
    'This is a demo of the CSP method in <a href="https://github.com/pwstegman/bcijs">bci.js</a>',
    'Graphics are powered by <a href="https://github.com/jonobr1/two.js/">two.js</a>'
];
var currentInfoText = 0;
var infoTextStarted = false;

// Plot the points
var container = document.getElementById('container');
var two = new Two({fullscreen: true}).appendTo(container);

var line = two.makeLine(-1, -1, -1, -1);

container.addEventListener('click', clicked, false);

function clicked(event){
    var x = event.pageX;
    var y = event.pageY;

    // Add a point to the page
    var circle = two.makeCircle(x, y, 5);
    circle.fill = currentColor;
    circle.noStroke();

    // Save it to the proper dataset
    var dataClass = circle.fill == color1 ? classA : classB;
    dataClass.push([x, y]);

    // Save the two.js point for later animation
    var pointClass = circle.fill == color1 ? pointsA : pointsB;
    pointClass.push(circle);

    // Update info text as needed
    var currentClass = currentColor == color1 ? classA : classB;
    if(currentInfoText == 0 && classA.length + classB.length == 1){
        updateHelpText(infoTexts[currentInfoText]);
    }else if(!infoTextStarted && currentClass.length == 2 && classA.length + classB.length >= 4){
        infoTextStarted = true;
        showNextHelpText();
    }

    function showNextHelpText(){
        currentInfoText++;
        if(currentInfoText > infoTexts.length - 1){
            currentInfoText = 1;
        }
        updateHelpText(infoTexts[currentInfoText]);
        setTimeout(showNextHelpText, 7000);
    }

    two.update();
}

function updateHelpText(text){
    if(helpText.innerHTML == text){
        return;
    }

    helpText.classList.remove('fadeIn');
    helpText.classList.add('fadeOut');
    setTimeout(function(){
        helpText.innerHTML = text;
        helpText.classList.add('fadeIn');
        helpText.classList.remove('fadeOut');
    }, 300);
}

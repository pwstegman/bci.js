// Define the colors
var color1 = '#007bff';
var color2 = '#dd5145';
var currentColor = color1;

// Keep track of the two datasets
var classA = [];
var classB = [];

// Toolbar
var color1btn = document.getElementById('color1btn');
var color2btn = document.getElementById('color2btn');
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
        two.clear();
        two.update();
        container.classList.remove('fadeOut');
    }, 300);
}, false);

// Info text
var infoTexts = [
    'Place at least two blue and two red points',
    'The line of separation is drawn using <a href="https://en.wikipedia.org/wiki/Linear_discriminant_analysis">linear discriminant analysis (LDA)</a>',
    'LDA has applications in machine learning for classification tasks',
    'This is a demo of the LDA method in <a href="https://github.com/pwstegman/bcijs">bci.js</a>',
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

    // Plot the LDA dividing line if we have enough data
    if(classA.length > 1 && classB.length > 1){
        var {theta, b} = bci.ldaLearn(classA, classB);

        var m = -theta[0] / theta[1];
        var b = -b / theta[1];
        plotLine(m, b);
    }

    // Update info text as needed
    var currentClass = currentColor == color1 ? classA : classB;
    if(currentInfoText == 0 && classA.length + classB.length == 1){
        updateHelpText(infoTexts[currentInfoText]);
    }else if(!infoTextStarted && currentClass.length == 2 && classA.length + classB.length >= 4){
        infoTextStarted = true;
        showNextHelpText();
    }

    function showNextHelpText(){
        return;
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

function plotLine(m, b){
    if(Math.abs(m) < 1){
        var x1 = 0;
        var x2 = two.width;
        var y1 = m * x1 + b;
        var y2 = m * x2 + b;
    }else{
        var y1 = 0;
        var y2 = two.height;
        var x1 = (y1 - b) / m;
        var x2 = (y2 - b) / m;
    }

    line.remove();
    line = two.makeLine(x1, y1, x2, y2);
    line.stroke = '#7b7b7b';
    line.linewidth = 3;
}

var bci = require('../index.js');

async function classify(data){
    // Time how long the function takes
    var startTime = Date.now();

    // Load EEG data from CSV
    console.log('Loading data from csv files');
    var left = await bci.loadCSV('data/left.csv');
    var right = await bci.loadCSV('data/right.csv');

    // Learn a CSP filter for the EEG data
    console.log('Computing CSP filter')
    var cspParams = bci.cspLearn(left, right);

    // Project the loaded data with the learned CSP parameters
    var cspLeft = bci.cspProject(cspParams, left);
    var cspRight = bci.cspProject(cspParams, right);

    /*
    CSP projects data so one dataset has highest variance in the first dimension
    and lowest variance in the last dimension, while the other dataset has
    lowest variance in the first and highest in the last. Therefore, the variance
    of the data in each dimension can be used as an effective feature for differentiating
    between the two classes. Taking the log of this variance makes the distribution
    more gaussian, so a classifier such as LDA can be used.
    */

    // Split the data into 64 sample windows with 50% overlap
    // Use the log of the variance of each channel in a window as the feature vector
    console.log('Passing features to LDA. Windows size = 64 samples, overlap = 50%');
    var featuresLeft = bci.windowApply(cspLeft, bci.features.logvar, 64, 32);
    var featuresRight = bci.windowApply(cspRight, bci.features.logvar, 64, 32);

    // Separate into training and testing sets
    var [trainingLeft, testingLeft] = bci.partition(featuresLeft, 0.6, 0.4); 
    var [trainingRight, testingRight] = bci.partition(featuresRight, 0.6, 0.4); 

    console.log('Using 60/40 split for training and testing sets');
    console.log('left hand training set size: ' + trainingLeft.length + ', testing set size: ' + testingLeft.length);
    console.log('right hand training set size: ' + trainingRight.length + ', testing set size: ' + testingRight.length);

    // Use LDA to separate the two training feature datasets
    var ldaParams = bci.ldaLearn(trainingLeft, trainingRight);

    // Let's see how well the learned LDA parameters perform on the testing set
    var predictionsLeft = bci.ldaProject(ldaParams, testingLeft);
    var predictionsRight = bci.ldaProject(ldaParams, testingRight);

    var leftCorrect = predictionsLeft.filter(x => x < 0).length;
    var rightCorrect = predictionsRight.filter(x => x > 0).length;

    var percentCorrectLeft = leftCorrect / predictionsLeft.length * 100;
    var percentCorrectRight = rightCorrect / predictionsRight.length * 100;
    var percentCorrectCombined = (leftCorrect + rightCorrect) / (predictionsLeft.length + predictionsRight.length) * 100;

    console.log('Percent of left hand movements correctly classified as left');
    console.log(percentCorrectLeft.toFixed(2) + '%');

    console.log('Percent of right hand movements correctly classified as right');
    console.log(percentCorrectRight.toFixed(2) + '%');

    console.log('Combined accuracy');
    console.log(percentCorrectCombined.toFixed(2) + '%');

    var runtime = Date.now() - startTime;
    console.log('Total run time ' + runtime + 'ms');
}
classify().catch(e => console.error(e));
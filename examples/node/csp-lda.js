const bci = require('../index.js'); // bcijs

async function classify(data){
    // Time how long the function takes
    let startTime = Date.now();

    // Load EEG data from CSV
    console.log('Loading data from csv files');
    let left = await bci.loadCSV('data/left.csv');
    let right = await bci.loadCSV('data/right.csv');

    // Learn a CSP filter for the EEG data
    console.log('Computing CSP filter')
    let cspParams = bci.cspLearn(left, right);

    // Project the loaded data with the learned CSP parameters
    let cspLeft = bci.cspProject(cspParams, left);
    let cspRight = bci.cspProject(cspParams, right);

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
    console.log('Passing features to LDA. Window size = 64 samples, overlap = 50%');
    let featuresLeft = bci.windowApply(cspLeft, window => bci.features.logvar(window, 'columns'), 64, 32);
    let featuresRight = bci.windowApply(cspRight, window => bci.features.logvar(window, 'columns'), 64, 32);

    // Separate into training and testing sets
    let [trainingLeft, testingLeft] = bci.partition(featuresLeft, 0.6, 0.4);
    let [trainingRight, testingRight] = bci.partition(featuresRight, 0.6, 0.4);

    console.log('Using 60/40 split for training and testing sets');
    console.log('left hand training set size: ' + trainingLeft.length + ', testing set size: ' + testingLeft.length);
    console.log('right hand training set size: ' + trainingRight.length + ', testing set size: ' + testingRight.length);

    // Use LDA to separate the two training feature datasets
    let ldaParams = bci.ldaLearn(trainingLeft, trainingRight);

    // Let's see how well the learned LDA parameters perform on the testing set
    let testingSet = testingLeft.concat(testingRight);
    let predicted = bci.ldaProject(ldaParams, testingSet);
    predicted = predicted.map(x => (x < 0) ? 0 : 1);
    let actual = Array(testingLeft.length).fill(0).concat(Array(testingRight.length).fill(1));

    let confusionMatrix = bci.confusionMatrix(predicted, actual);
    let f1 = bci.f1score(confusionMatrix);

    console.log();
    console.log(bci.toTable(confusionMatrix));
    console.log('f1 score ' + f1.toFixed(2));
    console.log();

    let runtime = Date.now() - startTime;
    console.log('Total run time ' + runtime + 'ms');
}
classify().catch(e => console.error(e));

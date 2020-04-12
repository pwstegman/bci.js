import { transpose, add, multiply, subtract, inv } from 'mathjs';
import stat from 'pw-stat';

/**
 * An LDA object
 * @deprecated since version 1.1
 * @name LDA
 * @memberof module:bcijs
 * @constructor
 * @param {number[][]} class1 - Data set for class 1, rows are samples, columns are variables
 * @param {number[][]} class2 - Data set for class 2, rows are samples, columns are variables
 */
export function LDA(...classes) {
	// Compute pairwise LDA classes (needed for multiclass LDA)
	if(classes.length < 2) {
		throw new Error('Please pass at least 2 classes');
	}

	let numberOfPairs = classes.length * (classes.length - 1) / 2;
	let pair1 = 0;
	let pair2 = 1;

	let pairs = new Array(numberOfPairs);

	for(let i = 0; i < numberOfPairs; i++){
		pairs[i] = computeLdaParams(classes[pair1], classes[pair2], pair1, pair2);

		pair2++;
		if(pair2 == classes.length) {
			pair1++;
			pair2 = pair1 + 1;
		}
	} 

	this.pairs = pairs;
	this.numberOfClasses = classes.length;
}

function computeLdaParams(class1, class2, class1id, class2id) {
	let mu1 = transpose(stat.mean(class1));
	let mu2 = transpose(stat.mean(class2));
	let pooledCov = add(stat.cov(class1), stat.cov(class2));
	let theta = multiply(inv(pooledCov), subtract(mu2, mu1));
	let b = multiply(-1, transpose(theta), add(mu1, mu2), 1 / 2);

	return {
		theta: theta,
		b: b,
		class1id: class1id,
		class2id: class2id
	}
}

/**
 * Predict the class of an unknown data point
 * @name project
 * @memberof module:bcijs.LDA
 * @function
 * @param {number[]} point - The data point to be classified.
 * @returns {number} value less than 0 if predicted to be in class 1, 0 if exactly inbetween, greater than 0 if class 2
 */
LDA.prototype.project = function (point) {
	if(this.pairs.length != 1) {
		throw new Error('LDA project currently only supports 2 classes. LDA classify can be used to perform multiclass classification.');
	}

	return projectPoint(point, this.pairs[0].theta, this.pairs[0].b);
}

function projectPoint(point, theta, b) {
	return add(multiply(point, theta), b);
}

/**
 * Classify an unknown point. Uses a pairwise voting system in the event of multiclass classification.
 * @param {number[]} point - The data point to be classified.
 * @returns {number} Returns the predicted class. Class numbers range from 0 to (number_of_classes - 1).
 */
LDA.prototype.classify = function(point) {
	// In the event of a binary classifier, skip the voting process
	if(this.numberOfClasses == 2) {
		return projectPoint(point, this.pairs[0].theta, this.pairs[0].b) <= 0 ? 0 : 1;
	}

	// Start each class with 0 votes
	let votes = new Array(this.numberOfClasses);
	for(let i = 0; i < this.numberOfClasses; i++) {
		votes[i] = 0;
	}

	// Allow each pair to cast a vote
	for(let i = 0; i < this.pairs.length; i++) {
		let params = this.pairs[i];
		let projection = projectPoint(point, params.theta, params.b);

		if(projection <= 0) {
			votes[params.class1id]++;
		} else {
			votes[params.class2id]++;
		}
	}

	// Find the winning class
	let classificaion = 0;
	let maxVotes = votes[0];
	for(let i = 1; i < votes.length; i++){
		if(votes[i] > maxVotes) {
			classificaion = i;
			maxVotes = votes[i];
		}
	}

	return classificaion;
}

export { LDA as lda };

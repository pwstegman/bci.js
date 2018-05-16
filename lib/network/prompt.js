// Use readline.question as a promise
/**
 * @memberof module:webbci
 * @function
 * @name prompt
 * @param {string} question - Question shown to user
 */
var readline = require('readline');

function prompt(question){
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

module.exports = prompt;
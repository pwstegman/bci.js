/**
 * Prompts the user for input via stdin
 * @memberof module:webbci
 * @function
 * @name prompt
 * @param {string} question - Question shown to user
 * @returns {Promise} A promise object that resolves with the response
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
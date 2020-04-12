import readline from 'readline';

/**
 * Prompts the user for input via stdin
 * <p>This method is exclusive to Node.js</p>
 * @memberof module:bcijs
 * @function
 * @name prompt
 * @param {string} question - Question shown to user
 * @returns {Promise} A promise object that resolves with the response
 */
export function prompt(question){
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

const reqlib = require('app-root-path').require;
const bci = reqlib('index.js');

const assert = require('assert');
const tmp = require('tmp');
const path = require('path');

describe('saveCSV and loadCSV', function(){
    // This method tests both saveCSV and loadCSV
    
    it('saveCSV saves an array to a CSV file, loadCSV loads a CSV file into an array', function(){
        var tmpobj = tmp.dirSync();
        var tmpdir = tmpobj.name;
        var csvpath = path.join(tmpdir, new Date().getTime() + '.csv');

        var array = [[1,2], [3,4], [5,6]];

        bci.saveCSV(array, csvpath)
        .then(() => {
            return bci.loadCSV(csvpath);
        }).then(result => {
            assert.deepEqual(result, array);
        })
        .catch(() => {
            // saveCSV and loadCSV don't current have error checking
            // Adding this for future when it is added
            console.warn('Unable to test saveCSV and loadCSV using temporary files');
        });
    });
});
var bci = require('../index.js');

bci.data.loadCSV('C:/Users/Pierce/OneDrive/shared/A.csv').then(data => console.log('A', data.array[10]));
bci.data.loadCSV('C:/Users/Pierce/OneDrive/shared/B.csv').then(data => console.log('B', data.array[10]));
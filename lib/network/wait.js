// Use setTimeout as a promise
module.exports = ms => new Promise(resolve => setTimeout(resolve, ms));
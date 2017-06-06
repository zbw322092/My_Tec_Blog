var minimatch = require('minimatch');

var a = ['t1', 't2', 't3'];
var b = {
  't1': 't1body',
  't2': 't2body',
  't3': 't3body',
  't4': 't4body'
};

var results = minimatch.match(a, '**', {matchBase: true});
console.log('resultsresultsresultsresults: ', results);
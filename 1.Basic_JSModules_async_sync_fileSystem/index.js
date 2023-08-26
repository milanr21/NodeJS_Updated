const lib = require('./lib.js');

const fs = require('fs');

const txt = fs.readFileSync('demo.txt', 'utf-8');
console.log(txt);

const t1 = performance.now();
// fs.readFile('demo.txt', 'utf-8', (err, data) => {
//   console.log(data);
// }); // import { sum, diff } from './lib.js';

// console.log(lib.sum(5, 5), lib.diff(5, 10));
const t2 = performance.now();

console.log(`The difference between the time taken is ${t2 - t1}`);
// Path: lib.js
// console.log(sum(5, 5), diff(5, 10));

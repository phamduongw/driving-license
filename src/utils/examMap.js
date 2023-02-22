const fs = require('fs');

const result = [];

// result.a1 = require('./a1.json');
// result.a2 = require('./a2.json');
// result.a34 = require('./a34.json');
// result.b1 = require('./b1.json');
// result.b2 = require('./b2.json');
// result.c = require('./c.json');
// result.def = require('./def.json');

result.push(require('./a1.json'));
result.push(require('./a2.json'));
result.push(require('./a34.json'));
result.push(require('./b1.json'));
result.push(require('./b2.json'));
result.push(require('./c.json'));
result.push(require('./def.json'));

fs.writeFile('./examMap.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

const fs = require('fs');

const result = [];

result.push(require('./a1.topic.json'));
result.push(require('./a2.topic.json'));
result.push(require('./a34.topic.json'));
result.push(require('./b1.topic.json'));
result.push(require('./b2cdef.topic.json'));

fs.writeFile('./reviewTopicsMap.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

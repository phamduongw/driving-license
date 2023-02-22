const fs = require('fs');

const result = [];

result.push(require('./a1.reviewTopics.json'));
result.push(require('./a2.reviewTopics.json'));
result.push(require('./a34.reviewTopics.json'));
result.push([...Array(600).keys()]);

fs.writeFile('./reviewTopicsMapOriginal.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

const a34 = require('./a34.topic.json');
const reviewTopicsMap = require('./reviewTopicsMap.json');

const result = [];

a34.forEach((item, id) => {
  if (id != 1) {
    const temp = [];
    item.indexes.forEach(index => {
      temp.push(reviewTopicsMap[2][index]);
    });
    result.push(temp);
  }
});

const fs = require('fs');

fs.writeFile('./a34.topic.refactor.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

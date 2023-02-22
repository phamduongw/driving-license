const fs = require('fs');

const reviewTopicsMap = require('./reviewTopicsMap.json');

const reviewTopicsMapCopy = [...reviewTopicsMap];

reviewTopicsMap.forEach((item1, index1) => {
  item1.forEach((item2, index2) => {
    reviewTopicsMapCopy[index1][index2].indexes = Array.from(
      item2.indexes,
      (item3, index3) => [item3, index3],
    );
  });
});

fs.writeFile(
  './reviewTopicsMapCopy.json',
  JSON.stringify(reviewTopicsMapCopy),
  err => {
    if (err) {
      console.error(err);
    }
  },
);

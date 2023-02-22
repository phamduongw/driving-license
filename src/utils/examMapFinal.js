const licenseDetails = require('./licenseDetails.json');
const examMap = require('./examMap.json');
const examMapCopy = [...examMap];
const reviewTopicMap = require('../../assets/reviewTopicMap.json');

let licenseId = '';

licenseDetails.forEach(item1 => {
  if (item1.id !== licenseId) {
    licenseId = item1.id;
    reviewTopicMap[item1.licenseReviewId].forEach(item2 => {
      examMapCopy[item1.id].push(item2.indexes);
    });
  }
});

console.log(examMapCopy[1].length);

// const fs = require('fs');

// fs.writeFile('./examMapCopy.json', JSON.stringify(examMapCopy), err => {
//   if (err) {
//     console.error(err);
//   }
// });

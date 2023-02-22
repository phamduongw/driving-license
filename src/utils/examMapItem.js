const fs = require('fs');
const licenseDetails = require('./licenseDetails.json');
const reviewTopicsMapCopy = require('./reviewTopicsMapCopy.json');

const a1 = require('../../data/mapping-json/a1.json');

const result = [];

Array.from({length: licenseDetails[6].totalExams}, (_, i) => i + 1).forEach(
  index => {
    const exam = [];
    a1.forEach(item => {
      if (item.eid === index) {
        exam.push([item.qid - 1, exam.length]);
      }
    });
    result[index - 1] = exam;
  },
);

fs.writeFile('./a1.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

const fs = require('fs');

const licenseDetails = require('./licenseDetails.json');

const indexRefactors = [];
let licenseId = '';

licenseDetails.forEach(licenseDetail => {
  if (licenseDetail.id !== licenseId) {
    const indexRefactor = [];
    [...Array(licenseDetail.totalQuestions).keys()].forEach(item => {
      let temp = item;
      [...Array(licenseDetail.totalExams).keys()].forEach((item, index) => {
        indexRefactor.push(temp);
        temp += licenseDetail.totalQuestions;
      });
    });
    indexRefactors.push(indexRefactor);
    licenseId = licenseDetail.id;
  }
});

const result = [];

const a34 = require('../../data/mapping-json/a34.json');

indexRefactors[2].forEach(item => {
  result.push(a34[item].qid - 1);
});

fs.writeFile('./a34.reviewTopics.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

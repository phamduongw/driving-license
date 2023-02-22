const examMap = require('./examMapAddIsSave.json');
const licenseDetails = require('../../assets/licenseDetails.json');

const examMapFinal2 = [];

licenseDetails.forEach(item1 => {
  examMapFinal2.push(examMap[item1.id]);
});

const fs = require('fs');

fs.writeFile('./examMapFinal2.json', JSON.stringify(examMapFinal2), err => {
  if (err) {
    console.error(err);
  }
});

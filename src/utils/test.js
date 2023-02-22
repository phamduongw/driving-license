const reviewTopics = require('../../assets/reviewTopics.json');
const licenseDetails = require('../../assets/licenseDetails.json');

const reviewTopicsFinal = [];

licenseDetails.forEach(item1 => {
  reviewTopicsFinal.push(reviewTopics[item1.id]);
});

const fs = require('fs');

fs.writeFile(
  './reviewTopicsFinal.json',
  JSON.stringify(reviewTopicsFinal),
  err => {
    if (err) {
      console.error(err);
    }
  },
);

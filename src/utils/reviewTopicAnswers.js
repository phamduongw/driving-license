const reviewTopicMap = require('./reviewTopicsMapCopy.json');
const licenseDetails = require('../../assets/licenseDetails.json');

// reviewTopicAnswers, reviewTopicResults
const reviewTopicAnswers = Array.from(licenseDetails, item1 =>
  Array.from(reviewTopicMap[item1.licenseReviewId], item2 =>
    Array(item2.indexes.length),
  ),
);

// reviewTopicStatistics
const reviewTopicStatistics = Array.from(licenseDetails, item1 =>
  Array.from(reviewTopicMap[item1.licenseReviewId], item2 => ({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalQuestions: item2.indexes.length,
  })),
);

console.log(reviewTopicAnswers[9][9]);

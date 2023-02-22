const licenseDetails = require('../../assets/licenseDetails.json');
const examMap = require('../../assets/examMap.json');

// licenseAnswers
const licenseAnswers = Array.from(licenseDetails, item1 =>
  Array.from(examMap[item1.id], item2 => Array(item2.length)),
);

// licenseResults
const licenseResults = Array.from(licenseDetails, item1 =>
  Array.from(examMap[item1.id], item2 =>
    Array.from(Array(item2.length), (_, index) => [undefined, index]),
  ),
);

// licenseStatistics
const licenseStatistics = Array.from(licenseDetails, item1 =>
  Array.from(examMap[item1.id], item2 => ({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalQuestions: item2.length,
  })),
);

console.log(licenseStatistics[8]);

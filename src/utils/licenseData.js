const fs = require('fs');

const licenseDetails = require('./licenseDetails.json');

// licenseAnswers
// const result = Array.from(Array(10), (_, index) =>
//   Array.from(Array(licenseDetails[index].totalExams), () =>
//     Array(licenseDetails[index].totalQuestions),
//   ),
// );

// licenseResults
// const result = Array.from(Array(10), (_, index) =>
//   Array.from(Array(licenseDetails[index].totalExams), () =>
//     Array.from(Array(licenseDetails[index].totalQuestions), (_, id) => ({
//       index: id,
//     })),
//   ),
// );

// licenseStatistics
const result = Array.from(Array(10), (_, index) =>
  Array.from(Array(licenseDetails[index].totalExams), () => ({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalQuestions: licenseDetails[index].totalQuestions,
  })),
);

// fs.writeFile('./rootAnswers.json', JSON.stringify(result), err => {
//   if (err) {
//     console.error(err);
//   }
// });

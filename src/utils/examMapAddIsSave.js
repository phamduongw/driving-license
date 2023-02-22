const examMap = require('../../assets/examMapOld3.json');
const examMapAddIsSave = [...examMap];

examMapAddIsSave.forEach(item1 => {
  // item1.forEach(item2 => {
  //   if (item2) {
  //     item2.forEach(item3 => {
  //       item3.push(false);
  //     });
  //   }
  // });
  // item1.push(Array.from(Array(50), (item, index) => [false, index])); // Save
  // item1.push(Array.from(Array(50), (item, index) => [false, index])); // False Answer
  item1.push([]); // Save
  item1.push([]); // False Answer
});

const fs = require('fs');

fs.writeFile(
  './examMapAddIsSave.json',
  JSON.stringify(examMapAddIsSave),
  err => {
    if (err) {
      console.error(err);
    }
  },
);

const a1 = [
  1, 2, 3, 7, 14, 24, 38, 40, 41, 42, 44, 45, 48, 55, 70, 71, 72, 101, 107, 109,
  110, 111, 113, 115, 117, 123, 126, 131, 132, 133, 134, 139, 142, 147, 149,
  150, 151, 152, 153, 166, 167, 173, 174, 179, 180, 183, 190, 194, 195, 196,
];

const a2 = [
  1, 38, 40, 56, 61, 62, 102, 103, 104, 149, 186, 190, 208, 209, 211, 218, 225,
  227, 228, 252, 260, 262, 266, 268, 278, 282, 311, 312, 317, 320, 321, 322,
  323, 325, 332, 333, 347, 348, 368, 369, 384, 394, 402, 403, 417, 425, 428,
  429, 440, 447,
];

const a3 = [
  1, 38, 40, 61, 67, 70, 71, 74, 75, 125, 126, 127, 176, 205, 209, 227, 228,
  230, 244, 246, 247, 271, 279, 281, 285, 287, 297, 330, 331, 336, 339, 340,
  342, 344, 366, 367, 387, 389, 390, 407, 419, 421, 423, 425, 434, 451, 467,
  468, 484, 493,
];

const b1 = [
  1, 38, 40, 61, 67, 70, 71, 74, 75, 125, 126, 127, 178, 181, 185, 202, 305,
  309, 327, 330, 344, 346, 347, 371, 379, 381, 385, 397, 430, 431, 436, 439,
  440, 442, 444, 466, 467, 487, 489, 490, 507, 521, 523, 525, 534, 551, 567,
  568, 584,
];

const examMap = require('../../assets/examMapOld2.json');
const examMapAdd50 = [...examMap];
const questions = require('../../assets/questions.json');
const reviewTopicsMap = require('./reviewTopicsMap.json');

// console.log(questions[reviewTopicsMap[0][0].indexes[a1[11] - 1]].q);

// const temp = [];

// a1.forEach(item1 => {
//   temp.push(reviewTopicsMap[0][0].indexes[item1 - 1]);
// });

examMapAdd50.forEach((item1, index1) => {
  if (index1 === 0) {
    const temp = [];
    a1.forEach(item2 => {
      temp.push([reviewTopicsMap[0][0].indexes[item2 - 1], temp.length]);
    });
    item1.push(temp);
  } else if (index1 === 1) {
    const temp = [];
    a2.forEach(item2 => {
      temp.push([reviewTopicsMap[1][0].indexes[item2 - 1], temp.length]);
    });
    item1.push(temp);
  } else if (index1 === 2 || index1 === 3) {
    const temp = [];
    a3.forEach(item2 => {
      temp.push([reviewTopicsMap[2][0].indexes[item2 - 1], temp.length]);
    });
    item1.push(temp);
  } else {
    const temp = [];
    b1.forEach(item2 => {
      temp.push([reviewTopicsMap[4][0].indexes[item2 - 1], temp.length]);
    });
    item1.push(temp);
  }
});

const fs = require('fs');

fs.writeFile('./examMapAdd50.json', JSON.stringify(examMapAdd50), err => {
  if (err) {
    console.error(err);
  }
});

// let questions = require('../../data/mapping-json/questions.json');
let sign1 = require('../../data/mapping-json/sign1.json');
let sign2 = require('../../data/mapping-json/sign2.json');
let sign3 = require('../../data/mapping-json/sign3.json');
let sign4 = require('../../data/mapping-json/sign4.json');
let sign5 = require('../../data/mapping-json/sign5.json');
let sign6 = require('../../data/mapping-json/sign6.json');

const fs = require('fs');

const result = {};

// questions.map(item => {
//   if (item.img) {
//     let name = item.img.split('.')[0];
//     result[name] = `require('./img/${item.img}')`;
//   }
// });

sign1.map(item => {
  result[item.img] = `require('./img/sign${item.img}.png')`;
});
sign2.map(item => {
  result[item.img] = `require('./img/sign${item.img}.png')`;
});
sign3.map(item => {
  result[item.img] = `require('./img/sign${item.img}.png')`;
});
sign4.map(item => {
  result[item.img] = `require('./img/sign${item.img}.png')`;
});
sign5.map(item => {
  result[item.img] = `require('./img/sign${item.img}.png')`;
});
sign6.map(item => {
  result[item.img] = `require('./img/sign${item.img}.png')`;
});

// fs.writeFile('./img.json', JSON.stringify(result), err => {
//   if (err) {
//     console.error(err);
//   }
// });

fs.writeFile('./sign.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

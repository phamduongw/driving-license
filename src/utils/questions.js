let questions = require('../../data/mapping-json/questions.json');

let result = [];

const fs = require('fs');

questions.map(item => {
  let choices = [];
  choices.push(item[1]);
  choices.push(item[2]);
  choices.push(item[3]);
  choices.push(item[4]);
  result.push({
    q: item.q,
    k: item.k ? true : false,
    i: item.img.split('.')[0],
    c: choices.filter(item => item != ''),
    a: item.a,
    e: item.e,
  });
});

fs.writeFile('./questions.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

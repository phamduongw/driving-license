const fs = require('fs');

let result = [];

let def = require('../../data/mapping-json/def.json');

def.map(item => {
  result.push(item.qid - 1);
});

fs.writeFile('./def.json', JSON.stringify(result), err => {
  if (err) {
    console.error(err);
  }
});

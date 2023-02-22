const sign1 = require('../data/mapping-json/sign1.json');
const sign2 = require('../data/mapping-json/sign2.json');
const sign3 = require('../data/mapping-json/sign3.json');
const sign4 = require('../data/mapping-json/sign4.json');
const sign5 = require('../data/mapping-json/sign5.json');
const sign6 = require('../data/mapping-json/sign6.json');
const SIGNS = {
  0: sign1.concat(sign2, sign3, sign4, sign5, sign6),
  1: sign1,
  2: sign2,
  3: sign3,
  4: sign4,
  5: sign5,
  6: sign6,
};
export default SIGNS;

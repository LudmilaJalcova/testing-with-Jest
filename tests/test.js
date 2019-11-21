const phoneNrsAreEqual = require('../function/index');

const inputCorrect = [
  { nr1: '0909999999', nr2: '0909999999', result: true },
  { nr1: '00421909999999', nr2: '00421909999999', result: true },
  { nr1: '+421909999999', nr2: '+421909999999', result: true },
  { nr1: '055/9999999', nr2: '055/9999999', result: true }, //pevna linka
  { nr1: '+420909999999', nr2: '+420909999999', result: true }, //Cesko
  { nr1: '+3609999999', nr2: '+3609999999', result: true }, //Madarsko
  { nr1: '+4309999999', nr2: '+4309999999', result: true }, //Rakusko
  { nr1: '+380909999999', nr2: '+380909999999', result: true }, //Ukrajina
  { nr1: '+4809999999', nr2: '+4809999999', result: true }, //Polsko
  { nr1: '0909999999', nr2: '00421909999999', result: true },
  { nr1: '00421909999999', nr2: '+421909999999', result: true },
  { nr1: '+421909999999', nr2: '00421909999999', result: true },
  { nr1: '+421909999999', nr2: '0909999999', result: true },
  { nr1: '0909999999', nr2: '+421909999999', result: true },
  { nr1: ' 0909999999', nr2: '0909999999', result: true },
  { nr1: '0909999999', nr2: ' 0909999999', result: true },
  { nr1: '0909999999 ', nr2: '0909999999', result: true },
  { nr1: '0909999999', nr2: '0909999999 ', result: true },
  { nr1: '0909 999 999', nr2: '0909999999', result: true },
  { nr1: '0909999999', nr2: '0909 999 999', result: true },
  { nr1: '0909 99 99 99', nr2: '0909999999', result: true },
  { nr1: '0909999999', nr2: '0909 99 99 99', result: true },
  { nr1: '0909 999 999', nr2: '0909 99 99 99', result: true },
  { nr1: '0909 99 99 99', nr2: '0909 999 999', result: true }
];

describe('Testing function phoneNrsAreEqual(nr1: String, nr2: String): Boolean', () => {
  inputCorrect.map((input, index) => {
    test(`${index}:Testing compare correct inputs: ${input.nr1} === ${input.nr2}`, () => {
      expect(phoneNrsAreEqual(input.nr1, input.nr2)).toBe(input.result);
    });
  });
});

const inputIncorrect = [
  { nr1: 'nezname cislo', nr2: '0909999999', result: false },
  { nr1: '0909999999', nr2: 'nezname cislo', result: false },
  { nr1: undefined, nr2: undefined, result: false },
  { nr1: false, nr2: false, result: false },
  { nr1: true, nr2: true, result: false },
  { nr1: true, nr2: false, result: false },
  { nr1: false, nr2: true, result: false },
  { nr1: '', nr2: '', result: false },
  { nr1: 'null', nr2: 'null', result: false },
  { nr1: null, nr2: null, result: false },
  { nr1: '{}', nr2: '{}', result: false }
  { nr1: '[]', nr2: '[]', result: false }
];

describe('Testing function phoneNrsAreEqual(nr1: String, nr2: String): Boolean', () => {
  inputIncorrect.map((input, index) => {
    test(`${index}:Testing compare incorrect inputs: ${input.nr1} !== ${input.nr2}`, () => {
      expect(phoneNrsAreEqual(input.nr1, input.nr2)).toBe(input.result);
    });
  });
});

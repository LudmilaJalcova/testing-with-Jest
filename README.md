# testing-with-Jest

## User story:
Pracovník telefonickej podpory eshopu vidí v administračnom systéme popri notifikácii prichádzajúceho hovoru aj informáciu o ktorú objednávku sa jedná, aby si ju vedel pred prijatím hovoru otvoriť kliknutím na link v notifikácii.

## Detaily:
Zákazníci, ktorí vytvárajú cez eshop objednávku zadávajú svoje telefónne číslo. Toto však zadávajú v rôznych formátoch (s predvoľbou štátu, bez predvoľby, s medzerami, bez medzier a podobne). Ak systém zachytí prichádzajúci hovor, tak porovná prichádzajúce telefónne číslo s telefónnymi číslami na všetkých otvorených objednávkach. Na porovnanie dvoch čísel sa použije JavaScriptová funkcia.

## Zadanie:
Napísanie unit testu pre JavaScriptovú funkciu na porovnávanie dvoch telefónnych čísel. Jedná sa o funkciu, ktorej vstupné parametre sú dva stringy a návratovým typom je true/false. True v prípade, že telefónne čísla sú rovnaké, False, ak nie sú. Do testu je potrebné zahrnúť čo najviac možných prípadov.

## Definícia JavaScriptovej funkcie: 
phoneNrsAreEqual(nr1: String, nr2: String): Bool

## Riešenie:

-subor index.js
```js
//https://regex101.com/r/u3hxjz/1 regex matcher

const phoneNrsAreEqual = (nr1, nr2) => {
  const regex = /^[\+]?([0]{2}?)?[(]?([0-9]{4})?([0-9]{3})?[\/]?[-\s\.\ \]?[0-9]{3}[-\s\.\ \]?[0-9]{4,6}$/;

  //https://www.w3schools.com/jsref/jsref_regexp_test.asp test() documentation
  const validPhoneNumber = number => regex.test(number);
  const clearNr = nr =>
    nr
      .trim()
      .replace(/^[0]{2}?/, '') //prve dve 0 nahradi prazdnym stringom
      .replace(/^[0]{1}?/, '') //prvu 0 nahradi prazdnym stringom
      .replace(/^[\+]{1}?/, '') //+ nahradi prazdnym stringom
      .replace(/^421?/g, '') //421 nahradi prazdnym stringom
      .replace(/^\+421?/g, '') //+421 nahradi prazdnym stringom
      .replace(/\-/g, '') //- nahradi prazdnym stringom
      .replace(/\//g, '') // / nahradi prazdnym stringom
      .replace(/ /g, ''); // medzeru nahradi prazdnym stringom

  if (typeof nr1 === 'string' && typeof nr2 === 'string') {
    if (
      validPhoneNumber(nr1.trim()) &&
      validPhoneNumber(nr2.trim()) &&
      clearNr(nr1) === clearNr(nr2)
    ) {
      return true;
    }
  }
  return false;
};

module.exports = phoneNrsAreEqual; 
```


subor test.js
```js
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
  { nr1: '{}', nr2: '{}', result: false },
  { nr1: '[]', nr2: '[]', result: false }
];

describe('Testing function phoneNrsAreEqual(nr1: String, nr2: String): Boolean', () => {
  inputIncorrect.map((input, index) => {
    test(`${index}:Testing compare incorrect inputs: ${input.nr1} !== ${input.nr2}`, () => {
      expect(phoneNrsAreEqual(input.nr1, input.nr2)).toBe(input.result);
    });
  });
});

```

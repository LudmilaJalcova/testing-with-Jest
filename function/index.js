const phoneNrsAreEqual = (nr1, nr2) => {
  const regex = /^[\+]?([0]{2}?)?[(]?([0-9]{4})?([0-9]{3})?[\/]?[-\s\.\ \]?[0-9]{3}[-\s\.\ \]?[0-9]{4,6}$/;
  const validPhoneNumber = number => regex.test(number);
  const clearNr = nr =>
    nr
      .trim()
      .replace(/^[0]{2}?/, '')
      .replace(/^[0]{1}?/, '')
      .replace(/^[\+]{1}?/, '')
      .replace(/^421?/g, '')
      .replace(/^\+421?/g, '')
      .replace(/\-/g, '')
      .replace(/\//g, '')
      .replace(/ /g, '');

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

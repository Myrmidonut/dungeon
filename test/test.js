const expect = require("chai").expect

describe('test that chai work', () => {
  const foo = 'bar';

  it('multiples two numbers', () => {
     expect(3 * 3).to.equal(9);
  })

  it('check the typeof a value', () => {
     expect(foo).to.be.a('string');
  })

  it('finds length of a value', () => {
     expect(foo).to.have.lengthOf(3);
  })
})
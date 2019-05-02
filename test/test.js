const expect = require("chai").expect

const player = require("../game/dummyPlayer")

/*describe('test that chai work', () => {
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
})*/

describe("player", () => {
   it("should be an object", () => {
      expect(player).to.be.a("object");
   })
})
const should = require("should");
const sinon = require("sinon");

const bookController = require("../controllers/bookController");

describe("Book Controller Tests", () => {
  describe("Post", () => {
    it("should not allow an empty title on posts", () => {
      const Book = function (book) {
        this.save = () => {};
      };
      const req = {
        body: { author: "Zak" },
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };
      const controller = bookController();
      controller.postBook(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad status: ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});

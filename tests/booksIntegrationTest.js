const should = require("should");
const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = 'Test';

const app = require("../index");

const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book CRUD test", () => {
  it("should allow a book to be created and return read and _id", (done) => {
    const bookPost = {
      author: "Ahmed Zaky",
      genre: "fiction",
      title: "A book",
    };
    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
          console.log(results);
          results.body.read.should.not.equal(false);
          results.body.should.have.property('_id');
          done();
      });
    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    });
    after((done) => {
        mongoose.connection.close();
        app.server.close(done());
    })
  });
});

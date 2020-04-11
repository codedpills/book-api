const express = require("express");

const Book = require("../models/bookModel");
const bookController = require("../controllers/bookController");

const routes = () => {
  const bookRouter = express.Router();
  bookRouter
    .route("/books")
    .post(bookController.postBook)
    .get(bookController.getBooks);
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.sendStatus(400).send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route("/books/:bookId")
    .get((req, res) => res.status(200).json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err, book) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save((err, book) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.status(201);
      });
    });
  return bookRouter;
};

module.exports = routes;

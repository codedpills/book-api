const Book = require("../models/bookModel");

const bookController = () => {
  const postBook = (req, res) => {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send("Title is required");
    }
    book.save((err, book) => {
      if (err) {
        return res.status(400).send(`Problem saving book! ${err}`);
      }
      res.status(201);
      return res.json(book);
    });
  };
  const getBooks = (req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.status(400).send(err);
      }
      // HATEEOAS stuff - generates links for api for easier navigation
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http//${req.headers.host}/api/books/${book._id}`;
      });
      return res.status(200).json(returnBooks);
    });
  };
  return { postBook, getBooks };
};

module.exports = bookController;

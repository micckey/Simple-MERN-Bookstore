import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for Saving a new Book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Input all fields first before submitting",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

//Fetching books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({ count: books.length, data: books });
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

//Fetching one book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

//Updating a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Input all fields first before submitting",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    // console.log(result);

    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

//Delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    // console.log(result);

    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

export default router;

import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for saving a new book
router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    // Validate publish year
    if (publishYear > 9999 || publishYear < 1000) {
      console.log("Publish year is invalid");
      return response.status(400).send({
        message: "Publish year invalid!",
      });
    }

    // Validate required fields
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields!",
      });
    }

    const newBook = { title, author, publishYear };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all books from db
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length, // Fixed typo here
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting a book by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a book
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    // Validate required fields
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields!",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true, // Return the updated document
    });

    if (!result) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(200).json({ message: "Book updated successfully!", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

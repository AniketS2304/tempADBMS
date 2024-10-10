import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBooks] = useState(null); // Initialize with null to check for data presence
  const [loading, setLoading] = useState(true); // Set to true initially to show loading spinner
  const { id } = useParams();

  useEffect(() => {
    setLoading(true); // Start loading before making the request
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false); // Stop loading once data is received
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Stop loading in case of error
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-4xl font-bold text-gray-700 my-6">Book Details</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : book ? (
        <div className="flex flex-col border-2 border-sky-400 bg-white shadow-lg rounded-xl w-full max-w-lg p-6 mx-auto">
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">ID: </span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Title: </span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Publish Year: </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Created At: </span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl font-semibold text-gray-600">Last Updated At: </span>
            <span>{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl text-red-500">
          <p>Book not found or an error occurred.</p>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

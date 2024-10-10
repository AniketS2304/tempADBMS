import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Home from './Home'
const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <BackButton />
      <h1 className="text-4xl font-bold text-gray-700 my-6">Create Book</h1>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="my-4">
          <label className="text-xl font-semibold text-gray-600 mb-2 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 rounded-lg px-4 py-2 w-full transition-colors"
            placeholder="Enter the title"
          />
        </div>
        <div className="my-4">
          <label className="text-xl font-semibold text-gray-600 mb-2 block">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 rounded-lg px-4 py-2 w-full transition-colors"
            placeholder="Enter the author's name"
          />
        </div>
        <div className="my-4">
          <label className="text-xl font-semibold text-gray-600 mb-2 block">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 rounded-lg px-4 py-2 w-full transition-colors"
            placeholder="Enter the publish year"
          />
        </div>
        <button
          onClick={handleSaveBook}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-all focus:ring-4 focus:ring-sky-300"
        >
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;

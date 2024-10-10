import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Failed to load books", { variant: "error" });
        setLoading(false);
      });
  }, [enqueueSnackbar]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-700">Books List</h1>
        <Link to="/books/create" title="Add new book" className="text-sky-800 hover:text-sky-600">
          <MdOutlineAddBox className="text-5xl" />
        </Link>
      </div>

      <div className="flex justify-center items-center gap-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg transition duration-300 ${showType === "table" ? "bg-sky-500 text-white" : "bg-sky-300 hover:bg-sky-500"}`}
          onClick={() => setShowType("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition duration-300 ${showType === "card" ? "bg-sky-500 text-white" : "bg-sky-300 hover:bg-sky-500"}`}
          onClick={() => setShowType("card")}
        >
          Card View
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;

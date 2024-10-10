import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ShowBook = () => {
  const { id } = useParams(); // Get the book ID from the URL parameters
  const [book, setBook] = useState(null); // State to hold book details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error message
  const navigate = useNavigate(); // For navigation
  const { enqueueSnackbar } = useSnackbar(); // For notifications

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data); // Set book data
      } catch (err) {
        console.error(err);
        setError('Failed to fetch book details.');
        enqueueSnackbar('Failed to fetch book details.', { variant: 'error' });
        navigate('/'); // Redirect to home on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBook(); // Call the fetch function
  }, [id, navigate, enqueueSnackbar]);

  // Show loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <h2 className="text-lg mb-2">Author: {book.author}</h2>
      <h3 className="text-md mb-2">Published Year: {book.publishYear}</h3>
      <p className="text-md">{book.description || "No description available."}</p>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate(`/books/edit/${id}`)} // Navigate to edit page
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          onClick={() => navigate(`/books/delete/${id}`)} // Navigate to delete page
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShowBook;

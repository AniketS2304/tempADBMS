import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../../Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!email || !password) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5555/auth/login", {
        email,
        password,
      });

      // Assuming the response contains a token and user info
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token in local storage
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/books"); // Redirect to the all books page
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Login failed. Please check your credentials.", { variant: "error" });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {loading && (
          <div className="flex justify-center mb-4">
            <Spinner />
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded w-full hover:bg-sky-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-sky-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

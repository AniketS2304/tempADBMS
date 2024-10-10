import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './components/auth/login/login';
import SignUp from './components/auth/signUp/signUp';
import allBooks from './pages/allBooks';

const App = () => {
  // Simple authentication check (replace this with actual auth logic)
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  return (
    <Routes>
      {/* Redirect root path to login page */}
      {/* <Route path="/" element={<Navigate to="/auth/login" />} /> */}
    <Route path='/'  element={<Home/>}></Route>
      {/* Public routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path='/books' element = {<Home/>} ></Route>
      {/* Protected routes - redirect to login if not authenticated */}
      <Route path="/books/create" element={isAuthenticated ? <CreateBook /> : <Navigate to="/auth/login" />} />
      <Route path="/books/details/:id" element={isAuthenticated ? <ShowBook /> : <Navigate to="/auth/login" />} />
      <Route path="/books/edit/:id" element={isAuthenticated ? <EditBook /> : <Navigate to="/auth/login" />} />
      <Route path="/books/delete/:id" element={isAuthenticated ? <DeleteBook /> : <Navigate to="/auth/login" />} />

      {/* Home route - might want to protect this too */}
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default App;

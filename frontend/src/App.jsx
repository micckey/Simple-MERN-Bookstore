// import React from 'react'

import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import CreateBook from "./views/CreateBook";
import ShowBook from "./views/ShowBook";
import EditBook from "./views/EditBook";
import DeleteBook from "./views/DeleteBook";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Component/register';
import Login from './Component/login';
import Crud from './Component/Crud';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/index" element={<Crud />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
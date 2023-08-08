import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './Component/HomePage.js';
import Form from './Component/Form.js';

import './App.css';

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pizza" id = "order-pizza">Pizza</Link>

      </nav>

      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/pizza" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;

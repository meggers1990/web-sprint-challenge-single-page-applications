import React from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // Import necessary components
import Home from './Component/HomePage.js';
import Form from './Component/Form.js';

import './App.css';

const App = () => {
  return (
    <div>
      <nav>
        {/* Links for navigation */}
        <Link to="/">Home</Link>
        <Link to="/pizza">Pizza</Link>
      </nav>

      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pizza" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;

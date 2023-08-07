
// Imports
import React from 'react';
import Home from './Component/Home.js'
import Form from './Component/Form.js'
import { BrowserRouter as Route, Link, Routes } from 'react-router-dom';
import './App.css';

// App
const App = () => {

  // Returns
  return (
    <div>
      
        <Link to='/'>Home</Link>
        <Link to='pizza'>Pizza</Link>
        
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='pizza' element={<Form />} />
          </Routes>
        
      
    </div>
  );
};

// Exports
export default App;

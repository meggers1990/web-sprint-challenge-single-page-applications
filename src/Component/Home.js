// Imports
import React from 'react';
import { Link, Route } from 'react-router-dom';
import Form from './Form.js';


// Home
function Home() {

    // Returns
    return (
        <div>
            <div>
                <h1>Lambda Eats!</h1>
            </div>
            <div id='Pizza'>
                <div className='Button'>

                    <button className='move'><Link id='order-pizza' to='/pizza'>Order Here!</Link></button>
                
                </div>
            </div>
        </div>
    );
};

// Exports
export default Home;
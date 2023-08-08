import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from './Validation.js';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const initialFormValues = {
  name: '',
  size: '',
  toppings: [],
  special: '',
};

const toppingsList = [
  { value: 'ham', label: 'Ham' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'bananaPeppers', label: 'Banana Peppers' },
  { value: 'beefPepperoni', label: 'Beef Pepperoni' },
];

function Form() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Handle checkboxes separately
    if (type === 'checkbox') {
      if (checked) {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          toppings: [...prevFormValues.toppings, value],
        }));
      } else {
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          toppings: prevFormValues.toppings.filter((topping) => topping !== value),
        }));
      }
    } else {
      const newValue = type === 'checkbox' ? (checked ? value : '') : value;
      validate(name, newValue);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://reqres.in/api/orders', formValues).then((res) => {
      console.log('Response:', res.data);
    });
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch((err) => setErrors({ ...errors, [name]: err.message }));
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <form id="pizza-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name-input"
        type="text"
        name="name"
        onChange={handleChange}
        value={formValues.name}
      />
      {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

      <label htmlFor="size">Size</label>
      <select
        id="size-dropdown"
        name="size"
        onChange={handleChange}
        value={formValues.size}
      >
        <option value="">Select a size!</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <div>
        <label>Choose Toppings:</label>
        {toppingsList.map((topping) => (
          <label key={topping.value}>
            {topping.label}
            <input
              name="toppings"
              type="checkbox"
              value={topping.value}
              onChange={handleChange}
              checked={formValues.toppings.includes(topping.value)}
            />
          </label>
        ))}
      </div>

      <label htmlFor="special">Special Pizzas!</label>
      <input
        id="special-text"
        type="text"
        name="special"
        onChange={handleChange}
        value={formValues.special}
      />
      <button id="order-button" type="submit" disabled={disabled}>
        Submit!
      </button>

      {/* Adding a link to navigate back */}
      <Link to="/">Back to Home</Link>
    </form>
  );
}

export default Form;

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; // Import axios for mocking

import App from '../App'; // Update the path accordingly

jest.mock('axios');

describe('Pizza test, sprint 3 challenge', () => {
  it('Homepage at "/" route, has link or button with #order-pizza', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const orderPizzaButton = screen.getByTestId('order-pizza'); // Change this to the correct selector
    expect(orderPizzaButton).toBeInTheDocument();
  });

  it('Form has validation for #name-input with error message "name must be at least 2 characters"', async () => {
    render(
      <MemoryRouter initialEntries={['/pizza']}>
        <App />
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId('name-input'); // Change this to the correct selector
    expect(nameInput).toBeInTheDocument();

    fireEvent.input(nameInput, { target: { value: 'a' } });

    await waitFor(() => {
      expect(screen.getByText('name must be at least 2 characters')).toBeInTheDocument();
    });

    fireEvent.input(nameInput, { target: { value: '' } }); 
  });

  it('Fill out #pizza-form, submit #pizza-form with data to https://reqres.in/api/orders', async () => {
    render(
      <MemoryRouter initialEntries={['/pizza']}>
        <App />
      </MemoryRouter>
    );

    const nameInput = screen.getByTestId('name-input'); 
    const sizeDropdown = screen.getByTestId('size-dropdown'); 

    const toppingsChecklist = screen.getAllByTestId('toppings-checkbox'); 
    const specialInstructions = screen.getByTestId('special-text'); 
    const orderButton = screen.getByTestId('order-button'); 

    userEvent.type(nameInput, 'Tony Stark');
    userEvent.selectOptions(sizeDropdown, 'medium');
    userEvent.click(toppingsChecklist[0]);
    userEvent.click(toppingsChecklist[1]);
    userEvent.type(specialInstructions, 'Here are the special instructions');

   
    axios.post.mockResolvedValue({});

    userEvent.click(orderButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://reqres.in/api/orders',
        
        it('Form has validation for #name-input with error message "name must be at least 2 characters"', async () => {
            render(
              <MemoryRouter initialEntries={['/pizza']}>
                <App />
              </MemoryRouter>
            );
          
            const nameInput = screen.getByTestId('name-input'); // Change this to the correct selector
            expect(nameInput).toBeInTheDocument();
          
            fireEvent.input(nameInput, { target: { value: 'a' } });
          
            await waitFor(() => {
              const errorMessage = screen.queryByText('name must be at least 2 characters');
              expect(errorMessage).toBeInTheDocument(); // The error message should be present
            });
          
            fireEvent.input(nameInput, { target: { value: 'John Doe' } }); // Clear the input value
            const errorMessage = screen.queryByText('name must be at least 2 characters');
            expect(errorMessage).not.toBeInTheDocument(); // The error message should be gone
          });
          

      );
    });
  });
});

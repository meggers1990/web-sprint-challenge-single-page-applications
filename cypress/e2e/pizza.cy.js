import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';


import App from '../App'; // Update the path accordingly

jest.mock('axios');

describe('Pizza test, sprint 3 challenge', () => {
    it('Homepage at "/" route, has link or button with #order-pizza', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        const orderPizzaButton = screen.getByTestId('order-pizza');
        expect(orderPizzaButton).toBeInTheDocument();
    });

    it('Form has validation for #name-input with error message "name must be at least 2 characters"', async () => {
        render(
            <MemoryRouter initialEntries={['/pizza']}>
                <App />
            </MemoryRouter>
        );

        const nameInput = screen.getByTestId('name-input');
        expect(nameInput).toBeInTheDocument();

        fireEvent.input(nameInput, { target: { value: 'a' } });

        await waitFor(() => {
            expect(screen.getByText('name must be at least 2 characters')).toBeInTheDocument();
        });

        fireEvent.input(nameInput, { target: { value: '' } });
    })
})

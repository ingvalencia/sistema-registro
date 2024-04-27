import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

test('renders the signup form', () => {
  render(<SignUp />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('allows the user to enter text', () => {
  render(<SignUp />);
  const usernameInput = screen.getByLabelText(/username/i);
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  expect(usernameInput.value).toBe('testuser');
});

test('submits the form', () => {
  const handleSubmit = jest.fn();  // Mock function
  render(<SignUp onSubmit={handleSubmit} />);  // Pass it as a prop
  fireEvent.submit(screen.getByRole('button'));
  expect(handleSubmit).toHaveBeenCalled();  // Check if it's called
});

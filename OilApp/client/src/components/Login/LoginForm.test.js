import React from 'react';
import LoginForm from './LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from "@testing-library/user-event"

test ('Login Form testing', () => {
    render(<BrowserRouter><LoginForm /></BrowserRouter>);
    
    
})

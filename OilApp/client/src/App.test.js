import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

test ('App startup should render NULL user', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const user = localStorage.getItem('token');
    const userState = null;
    expect(user).toBe(userState);
})


import React from 'react';
import Profile from './profile';
import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

test ('Login Form testing', () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
})

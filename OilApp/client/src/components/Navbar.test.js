import React from 'react';
import Navbar from './Navbar';
import ListItem from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { screen, render, fireEvent } from '@testing-library/react';

test ('Login Form testing', () => {
    render(<BrowserRouter><Navbar /></BrowserRouter>);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toEqual(3);
});

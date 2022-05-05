import React from 'react';
import Input from './Input';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const input = document.createElement('input');
    ReactDOM.render(<Input />, input);
})

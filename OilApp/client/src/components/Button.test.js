import React from 'react';
import Button from './Button';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button></Button>, div);
})


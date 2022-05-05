import React from 'react';
import FuelQuoteForm from './FuelQuoteForm';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FuelQuoteForm />, div);
})

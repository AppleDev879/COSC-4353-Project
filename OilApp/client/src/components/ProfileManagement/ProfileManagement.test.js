import React from 'react';
import ProfileManagement from './profileManagment';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileManagement />, div);
})

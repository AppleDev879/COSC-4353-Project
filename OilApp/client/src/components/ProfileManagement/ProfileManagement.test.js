import React from 'react';
import ProfileManagement from './profileManagment';
import ReactDOM from 'react-dom';
import {fireEvent, render,screen} from '@testing-library/react'
import Pmanagment from './profileManagment'
import '@testing-library/jest-dom'

import "@testing-library/jest-dom/extend-expect"



it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfileManagement />, div);
})

it('elements present',() =>{
    const {getByTestId}=render(<Pmanagment ></Pmanagment>);
    const name=getByTestId('Name')

    const addy=getByTestId('Address1')
    const city =getByTestId('City')
    const zip=getByTestId('ZipCode')
    const button=getByTestId('submit_button')
    const state=getByTestId('STATE')
 
    expect (name).toBeInTheDocument()
    expect(zip).toBeInTheDocument()
    expect(addy).toBeInTheDocument()
    expect(city).toBeInTheDocument()
    expect(zip).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    
}
)


it('enabled button',() =>{
    const handleSubmit = jest.fn();
    const {getByTestId}=render(<Pmanagment handleSubmit={handleSubmit}  ></Pmanagment>);
    const name=getByTestId('Name')
    const state=getByTestId('STATE')
    const addy=getByTestId('Address1')
    const city =getByTestId('City')
    const zip=getByTestId('ZipCode')
    const button=getByTestId('submit_button')
    fireEvent.change(name,{'target':{'value':'Lizandro'}})
    fireEvent.change(addy,{'target':{'value':'123 main st'}})
    fireEvent.change(city,{'target':{'value':'houston'}})
    fireEvent.change(state, { target: { value: 'TX' } })
    fireEvent.change(zip,{'target':{'value':'77065'}})
    expect(button).not.toBeDisabled

}
)


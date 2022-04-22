import styled from "styled-components";

export default function Input({type,placeholder,value, onChange,id, autocomplete}){
    return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} id={id} autocomplete={autocomplete} />;
}

const StyledInput = styled.input`

background: rgba(155, 195, 223,0.45);
box-shadow: 0.5rem 0.5rem 0.75rem 0 rgba(48,25,52, 0.5);
border-radius: 2rem;
width: 100%;
max-height: 3.125rem;
padding: 1rem;
margin-bottom: 1.5rem;
border: none;
outline: none;
color: #EBE8EE;
font-size: 1rem;
font-weight: bold;

&:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #EBE8EE;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
}

&::placeholder {
    color: #e0dce5;
    font-weight: 300;
    font-size: 1rem;
}

@media only screen and (max-width: 320px) {
    padding: 1em;
    height: 2.1em;
    margin-bottom: 1em;

  &::placeholder{
      font-size: 0.83rem;
      font-weight: 500;
  }
}

@media only screen and (min-width: 321px) {
    padding: 1em;
    height: 2.5em;
    margin-bottom: 1em;

  &::placeholder{
      font-size: 0.83rem;
      font-weight: 500;
  }
}
@media only screen and (min-width: 400px){
    padding: 1rem;
    height: 2.81rem;
    margin-bottom: 1.25rem;

  &::placeholder{
      font-size: 0.9rem;
      font-weight: 500;
  }
}

@media only screen and (min-width: 625px){
    padding: 1rem;
    height: 3.125rem;
    margin-bottom: 1.5rem;

  &::placeholder{
      font-size: 1rem;
      font-weight: 500;
  }
}

`;
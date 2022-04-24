import styled from "styled-components";
import React from "react";

export default function Button({content}){
    return <StyledButton>{content}</StyledButton>;
}

const StyledButton = styled.button`
background: linear-gradient(135deg, hsla(235, 100%, 78%, 1) 0%, hsla(293, 84%, 12%, 1) 100%);
box-shadow: 8px 8px 12px 0 rgba(48,25,52, 0.5);
text-transform: uppercase;
letter-spacing: 0.2rem;
width: 85%;
height: 3.125rem;
border: none;
color: #fbfcff;
border-radius: 2rem;
cursor: pointer;
transition-duration: 0.35s;
transition-timing-function: ease;

&:hover {
    transform: scale(1.05);
}


@media only screen and (max-width: 320px) {
  height: 2.2rem;
  font-size: 0.83rem;

}

@media only screen and (min-width: 321px) {
  height: 2.5rem;
  font-size: 0.83rem;

}

@media only screen and (min-width: 400px){
  height: 2.81rem;
  font-size: 0.9rem;

}

@media only screen and (min-width: 625px){
  height: 3.125rem;
  font-size: 1rem;

}


`;
import styled from "styled-components";

export default function Icon({ color, children, onClick })
{
    return <StyledIcon background={color} onClick={onClick}>{children}</StyledIcon>
}

const StyledIcon = styled.div`
height: 6.8em;
width: 6.8em;
display: flex;
justify-content: center;
align-items: center;
border-radius: 6.4em;
color: #fbfcff;
cursor: pointer;
background: ${(props) => props.background};
box-shadow: .8em .8em 1.2em 0 rgba(48,25,52, 0.5);
transition-duration: .35s;
transition-timing-function: ease;

svg {
    width: 3.4em;
    height: 3.4em;
}

&:hover{
    transform: scale(1.10);
    box-shadow: 0 0 .8em .3em #fbfcff; 
}

@media only screen and (max-width: 320px){
  height: 4em;
  width: 4em;

  svg{
      width: 2em;
      height: 2em;
  }
}

@media only screen and (min-width: 321px) {
  height: 5em;
  width: 5em;

  svg{
      width: 2.5em;
      height: 2.5em;
  }
}

@media only screen and (min-width: 400px){
  height: 6em;
  width: 6em;

  svg{
      width: 3em;
      height: 3em;
  }
}

@media only screen  and (min-width: 625px){
  height: 6.8em;
  width: 6.8em;

  svg{
      width: 3.4em;
      height: 3.4em;
  }
}
`;
import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = ({logout}) => {
  
  return (
    <NavBar>
        <Logo><StyledLink to="/">Oil App</StyledLink></Logo>
        <List>
        <ListItem><StyledLink to="/">Pricing Form</StyledLink></ListItem>
            <ListItem><StyledLink to="/profile">Profile</StyledLink></ListItem>
            <ListItem onClick={logout}>Logout</ListItem>
        </List>
    </NavBar>
  )
};

const NavBar = styled.div`
    position: fixed;
    top: 0;
    height: 3.5rem;
    width: 100vw;
    background: rgba(26, 15, 35, 0.8);
    box-shadow: 8px 8px 12px 0 rgba(48,25,52, 0.5);
    backdrop-filter: blur(8.5px);
    color: #fbfcff;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Logo = styled.span`
font-size: 1.5rem;
font-weight: bold;

`;

const List = styled.ul`
display: flex;
align-items: center;
list-style: none;
font-size: 0.9rem;
`;

const ListItem = styled.li`
  margin-right: 1.5rem;
  letter-spacing: 0.03rem;
  font-weight: 500;
  cursor: pointer;
`;

const Avatar = styled.img`
width: 2rem;
height: 2rem;
border-radius: 50%;
object-fit: cover;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export default Navbar
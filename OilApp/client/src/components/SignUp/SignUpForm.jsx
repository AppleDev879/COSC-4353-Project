import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "../SignUp/styles.module.css";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import img from "../oil_barrel_mint.jpg";
import React from "react";

const SignUpForm = () => {
	const Facebookbg = "linear-gradient(315deg, hsla(220, 77%, 30%, 1) 0%, hsla(220, 46%, 48%, 1) 100%)";
	const Googlebg = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)";
	const Githubbg = "linear-gradient(315deg, #000000 0%, #414141 74%)";
	
	const google = ()=>{
		window.open("http://localhost:8080/auth/google", "_self")
	  }
	  const github = ()=>{
		window.open("http://localhost:8080/auth/github", "_self")
	  }
	
	  const facebook = ()=>{
		window.open("http://localhost:8080/auth/facebook", "_self")
	  }
	
	const [fullName, setName] = useState('');
	const[email, setEmail] = useState('');
	const[password, setPassword] = useState('');
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const data = {fullName, email, password};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (<Background>
    {error && <Popup data-testid="popup">{error}</Popup>}
		<SignUpContainer onSubmit={handleSubmit}>
         <Error>
      <h1>Please turn your device upright</h1>
    </Error>
    <Wrapper>
        <Link to="/login" className={styles.ExitIcon} data-testid="exit-icon" />
        <WelcomeText><h1>Create An Account</h1></WelcomeText>
        <IconsContainer>
        <Icon color={Googlebg} onClick={google}>
        <FcGoogle/>
      </Icon>
      <Icon color={Facebookbg} onClick={facebook}>
        <FaFacebookF/>
      </Icon>
      <Icon color={Githubbg} onClick={github}>
        <FaGithub />
      </Icon>
        </IconsContainer>
        <HRuleWhite />
        <h5> or sign up with</h5>
        <InputContainer>
          <Input
          type="text" 
          placeholder="Full Name"
          value={fullName} onChange={(e) => setName(e.target.value)}
           />
          <Input
          type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          autocomplete='email' id="email"/>
          <Input
           type="password" placeholder="Password"
           autocomplete="new-password"
           id="new-password"
           value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputContainer> 
        <ButtonContainer>
          <Button type="submit" content="Sign Up" />
        </ButtonContainer>
        <BottomDiv>
          {error && <Error>{error}</Error>}
          <AlreadyHave>Already have an account?</AlreadyHave>
          <Link to="/login" style= {{ textDecoration: "none" }}><MutedTrigger> click here</MutedTrigger></Link>
        </BottomDiv>
        </Wrapper>
      </SignUpContainer>
	  </Background>
	);
};
const FadeIn = keyframes`
  0% { opacity: 0; }
  100% {opacity: 1;}
`;

const Popup = styled.div`
display: flex;
position: absolute;
top: 3vh;
z-index: 10;
text-align: center;
border-radius: 6px;
color: #fff;
font-size: 1rem;
font-weight: 600;
padding: 1.5rem;
background: rgba(69, 66, 120, 0.9);
box-shadow: 8px 8px 6px 0 rgba(48,25,52, 0.66);
backdrop-filter: blur(8.5px);
animation-name: ${FadeIn};
animation-duration: 0.35s;
transition-timing-function: ease;


&:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: rgba(69, 66, 120, 0.9) transparent transparent transparent;
  animation-name: ${FadeIn};
  animation-duration: 1s;
  transition-timing-function: ease;
}
`;

const Background = styled.section`
background-image: url(${img});
  background-size: cover;
  background-position: center;
	display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const SignUpContainer = styled.form`
display: flex;
position: relative;
height: 85vh;
max-height: 900px;
width: 80vw;
max-width: 500px;
min-height: 450px;
min-width: 250px;
background: linear-gradient(270deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
box-shadow: 8px 8px 12px 0 rgba(48,25,52, 0.5);
backdrop-filter: blur(8.5px);
border-radius: 20px;
color: #fbfcff;
text-transform: uppercase;
letter-spacing: 0.4rem;


@media only screen and (max-width: 320px){
  
  h1{
    font-size: 1rem;
  }

  h5{
    font-size: 0.55rem;
  }
  
}

@media only screen and (min-width: 321px)
{
  h1{
    font-size: 1.3rem;
  }

  h5{
    font-size: 0.67rem;
  }
  
}
@media screen and (min-width: 400px) {
  h1{
    font-size: 1.6rem;
  }

  h5 {
    font-size: 0.75rem;
  }
}
@media only screen and (min-width: 625px) {
  h1{
    font-size: 2rem;
  }

  h5 {
    font-size: 0.83rem;
  }
}

@media screen and (max-height: 450px) and (orientation: landscape){
  background: none;
  backdrop-filter: none;
  box-shadow: none;
}

`;

const Error = styled.div`
position: absolute;
height: 100%;
width:100%;
display: none;
text-align: center;
align-items: center;
flex-direction: column;
justify-content: center;
overflow: hidden;
border-radius: 20px;

@media screen and (max-height: 450px) and (orientation: landscape){
  display:flex;
}

`;

const Wrapper = styled.div`
position: absolute;
height: 100%;
width:100%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-evenly;
overflow: hidden;
border-radius: 20px;
visibility: visible;

@media screen and (max-height: 450px) and (orientation: landscape){
  display:none;
}
`;

const WelcomeText = styled.div`
width: 85%;
margin-top: 30px;
display: flex;
text-align: center;
align-items: center;
justify-content: center;
margin-bottom: 1em;
`;

const InputContainer = styled.div`

display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width: 85%;
margin-top: 1rem;
`;

const HRuleWhite = styled.hr`

position: relative;
height: 0.3rem;
width: 85%;
border-radius: 0.8rem;
border: none;
background: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
margin-bottom: 1em;
`;

const ButtonContainer = styled.div`
width: 85%;
display: flex;
align-items: center;
justify-content: center;
`;

const IconsContainer = styled.div`
display: flex;
justify-content: space-around;
width: 85%;
margin-bottom: 1rem;
`;

const AlreadyHave = styled.h5`
text-decoration:none;
background: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
text-align: center;
`;

const BottomDiv = styled.div`
width: 85%;
height: 15%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-evenly;
margin-top: 0.8em;
`;

const MutedTrigger = styled.h5`
text-decoration:none;
color: rgba(214,208,221, 0.7);
cursor: pointer;
transition: 350ms ease;

&:hover{
  color: #fbfcff;
}
`;

export default SignUpForm;

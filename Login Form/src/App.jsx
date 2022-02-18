import styled from "styled-components";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Input from "./components/Input";
import Button from "./components/Button";
import Icon from "./components/Icon";
import { motion } from "framer-motion";
import { useState } from "react";
import './index.css';


function App() {
  const Facebookbg = "linear-gradient(315deg, hsla(220, 77%, 30%, 1) 0%, hsla(220, 46%, 48%, 1) 100%)";
  const Googlebg = "linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)";
  const Applebg = "linear-gradient(315deg, #000000 0%, #414141 74%)";
  
  const [isExpanded, setExpanded] = useState(false);
  const playExpandingAnimation = () => {
    setExpanded(true);
  }
  const endExpandingAnimation = () => {
    setExpanded(false);
  }

  return <LoginContainer>
    <Error>
      <h1>Please turn your device upright</h1>
    </Error>
    <Wrapper>
    <WelcomeText><h1>Log in to your account</h1></WelcomeText>
    <IconsContainer>
    <Icon color={Googlebg}>
        <FcGoogle />
      </Icon>
      <Icon color={Facebookbg}>
        <FaFacebookF />
      </Icon>
      <Icon color={Applebg}>
        <FaApple />
      </Icon>
    </IconsContainer>
    <HorizontalRule 
      animate={isExpanded ? "expanded" : "collapsed"} 
      variants={HRVariant}
      transition={{ ease: "circIn", duration: 0.35 }}
    >
      <SignUpContainer variants={SUVariant}>
        <div className="ExitIcon" onClick={endExpandingAnimation} />
        <WelcomeText><h1>Create An Account</h1></WelcomeText>
        <IconsContainer>
          <Icon color={Googlebg}>
              <FcGoogle />
            </Icon>
            <Icon color={Facebookbg}>
              <FaFacebookF />
            </Icon>
            <Icon color={Applebg}>
              <FaApple />
            </Icon>
        </IconsContainer>
        <HRuleWhite />
        <h5> or sign up with</h5>
        <InputContainer>
          <Input type="text" placeholder="Full Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </InputContainer> 
        <ButtonContainer>
          <Button type="submit" content="Sign Up" />
        </ButtonContainer>
        <BottomDiv>
          <AlreadyHave>Already have an account?</AlreadyHave>
          <h5><MutedTrigger href="#" onClick={endExpandingAnimation}> click here</MutedTrigger></h5>
        </BottomDiv>
      </SignUpContainer>
    </HorizontalRule> 
    <h5> or Log in with</h5> 
    <InputContainer>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
    </InputContainer>
    <ButtonContainer>
      <Button type="submit" content="Log in" />
    </ButtonContainer> 
    <BottomDiv>
    <MutedTrigger href="#"><h5>Forgot Password?</h5></MutedTrigger>
    <InlineDiv><FirstTime>First time?&nbsp;</FirstTime><MutedTrigger href="#" onClick={playExpandingAnimation}> Sign up</MutedTrigger></InlineDiv>
    </BottomDiv>
    </Wrapper>
  </LoginContainer>;
}

const LoginContainer = styled.div`
display: flex;
position: relative;
height: 85vh;
max-height: 900px;
width: 80vw;
max-width: 500px;
min-height: 450px;
min-width: 250px;
background: rgba(69, 66, 120, 0.9);
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

const SignUpContainer = styled(motion.div)`
position: absolute;
height: 100%;
width:100%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-evenly;
overflow: hidden;
border-radius: 20px;
z-index: 1;
`;

const SUVariant = {
  collapsed: {
    visibility: "hidden",
    opacity: "0",
  },
  expanded: {
    visibility: "visible",
    opacity: "1",
  }
}

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

const ButtonContainer = styled.div`
width: 85%;
display: flex;
align-items: center;
justify-content: center;
`;

const HorizontalRule = styled(motion.div)`
position:relative;
height: 0.3rem;
width: 85%;
border-radius: 0.8rem;
border: none;
background: linear-gradient(270deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
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

const HRVariant = {
  expanded: {
    position: "absolute",
    height: "100%",
    width: "100%",
    transition: {
      when: "beforeChildren"
    }

  },
  collapsed: {
    position: "relative",
    height:"0.3rem",
    width: "85%",
  }
}

const IconsContainer = styled.div`
display: flex;
justify-content: space-around;
width: 85%;
margin-bottom: 1rem;
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

const FirstTime = styled.h5`
text-decoration:none;
background: linear-gradient(270deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
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

const InlineDiv = styled.div`
display: flex;
`;


export default App;

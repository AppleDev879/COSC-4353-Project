import styled from "styled-components";
import Navbar from "../Navbar";

const Main = ({user}) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.open("http://localhost:8080/auth/logout", "_self");
	};

	return (
		<HomePage>
			<Navbar logout={handleLogout} user={user} />
			<Text>Future Home Page</Text>
		</HomePage>
	);
};

const HomePage = styled.div`
background: hsla(271, 48%, 28%, 1);

background: linear-gradient(45deg, hsla(271, 48%, 28%, 1) 9%, hsla(199, 59%, 67%, 1) 100%);

background: -moz-linear-gradient(45deg, hsla(271, 48%, 28%, 1) 9%, hsla(199, 59%, 67%, 1) 100%);

background: -webkit-linear-gradient(45deg, hsla(271, 48%, 28%, 1) 9%, hsla(199, 59%, 67%, 1) 100%);
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
`;

const Text = styled.h1`
    color: #fff;
`


export default Main;

import styled from "styled-components";
import Navbar from "../Navbar";
import React from "react";
import Pmanagment from "../ProfileManagement/profileManagment";

const Profile = ({user}) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.open("http://localhost:8080/auth/logout", "_self");
	};

	return (
		<ProfilePage>
			<Navbar logout={handleLogout} user={user} />
			<Pmanagment />
		</ProfilePage>
	)
};

const ProfilePage = styled.div`
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


export default Profile;

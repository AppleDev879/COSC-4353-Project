import { Route, Routes } from "react-router-dom";
import Home from "./components/Main/Home";
import SignUp from "./components/SignUp/SignUpForm"
import Login from "./components/Login/LoginForm";
import { useState, useEffect } from "react";
import React from "react";
import Profile from "./components/Profile/profile";


function App() {
	const user = localStorage.getItem("token");

	const [User, setUser] = useState(null)
    useEffect(() => {
      const getUser = ()=>{
        fetch("http://localhost:8080/auth/login/success",{
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },

        })
        .then(response=>{
          if (response.status === 200) return response.json();
          throw new Error("Authentication failed");
        })
        .then(resObject=>{
          setUser(resObject.user);
        })
        .catch(err=>{
          console.log(err);
        });
      }
      getUser();
    }, []);

	
	return (
		<Routes>
			{user && <Route path="/" exact element={<Home />} />}
			<Route path="/signup" exact element={<SignUp />} />
			<Route path="/login" exact element={<Login />} />
      {User && <Route path="/" exact element={<Home />} />}
      {!user && !User && <Route path="/" element={<Login />}/>}
      {!user && !User && <Route path="/profile" element={<Login />}/>}
      {user && <Route path="/profile" exact element={<Profile />} />}
      {User && <Route path="/profile" exact element={<Profile />} />}
		</Routes>
	);
}

export default App;

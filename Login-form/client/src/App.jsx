import { Route, Routes } from "react-router-dom";
import Home from "./components/Main/Home";
import SignUp from "./components/SignUp/SignUpForm"
import Login from "./components/Login/LoginForm";
import { useState, useEffect } from "react"


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
      {User && <Route path="/" exact element={<Home user={User} />} />}
      {!user && !User && <Route path="/" element={<Login />}/>}
		</Routes>
	);
}

export default App;

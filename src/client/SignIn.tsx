import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SignIn = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [passwordState, setPasswordState] = useState('password');

// // after the token
//   const handleClicker = () => {
//     fetch(`https://github.com/login/oauth/authorize`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => handleFetch(data));
//   };

//   // step#2 GitHub Oauth
//     const handleFetch = (client_id) => {
//       console.log(client_id);
//       // fetch(`https://github.com/login/oauth/${client_id}`, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // })
//       // .then((response) => response.json())
//     };

  return( 
    <div >
    <button>
    {/* <Link to="/dashboard">Login</Link> */}
    <Link to="/auth/github">Login</Link>
    </button>
    </div>
  )
}
export default SignIn;
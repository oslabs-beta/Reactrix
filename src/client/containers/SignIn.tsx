// import React, { useState } from 'react';
// import { useNavigate } from "react-router";

// export interface Signin {
//     isAuth: boolean;
// }

// export type SigninFunction = (arg: Signin) => Promise<void>;

// const SignIn = () => {
//     const clientId= 'd223334a158fd98423d8';
//     const [isAuth, setIsAuth] = useState(false);

//     const navigate = useNavigate();
//     const handleLogin = () => {
//         fetch(`/api/login?clientId=${clientId}`, {
//             method: "GET",
//         })
//             .then((response) => response.json());
//         };
//         console.log ('hi');
//     }
// //     return( 
// //     <div>
// //     <button onClick={()=> handleLogin()}>Login</button>
// //     </div>
// //     )
// //   }
//   export default SignIn;
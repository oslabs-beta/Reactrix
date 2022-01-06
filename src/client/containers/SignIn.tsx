import React, { useState } from 'react';
import { Link } from "react-router-dom";


// export type SigninFunction = (Props: Signin) => Promise<void>;

const SignIn = () => {

    return( 
    <div >
    <button>Login</button>
    <Link to="dashboard">click here</Link>
    </div>
    )
  }

export default SignIn;
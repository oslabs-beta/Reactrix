import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import './styles/styles.css';

import Main from './Main';
import GuestDashBoard from './containers/GuestDashBoard';
import SignIn from './containers/SignIn';
import Footer from './components/Footer';
import { AnyObject } from 'chart.js/types/basic';

// export default function App() {

//     return (
//         <AuthProvider>
//                 <Routes>
//                     {/* <Route path="/" element={<Navigate to="/signIn" />} /> */}
//                     <Route path="/" element={ user ? <Navigate to="/dashboard"/> : <SignIn />} />
//                     <Route path="/dashboard"
//                         element={
//                             <RequireAuth>
//                                 <Main />
//                             </RequireAuth>
//                         } 
//                     />
//                 </Routes>
//         </AuthProvider>
//     );
// };

// function Layout() {
//     return (
//         <div>
//             <AuthStatus />

//             <ul>
//                 <li>
//                     <Link to="/">Public Page</Link>
//                 </li>
//                 <li>
//                     <Link to="/dashboard">Protected Page</Link>
//                 </li>
//             </ul>

//             <Outlet />
//         </div>
//     );
// }

// interface AuthContextType {
//     user: any;
//     signin: (user: string, callback: VoidFunction) => void;
//     signout: (callback: VoidFunction) => void;
// }

// let AuthContext = React.createContext<AuthContextType>(null!);

// function AuthProvider({ children }: { children: React.ReactNode }) {
//     let [user, setUser] = React.useState<any>(null);
  
//     let signin = (newUser: string, callback: VoidFunction) => {
//       return fakeAuthProvider.signin(() => {
//         setUser(newUser);
//         callback();
//       });
//     };
  
//     let signout = (callback: VoidFunction) => {
//       return fakeAuthProvider.signout(() => {
//         setUser(null);
//         callback();
//       });
//     };
  
//     let value = { user, signin, signout };
  
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
//   }
  
// function useAuth() {
//     return React.useContext(AuthContext);
//   }
  
//   function AuthStatus() {
//     let auth = useAuth();
//     let navigate = useNavigate();
  
//     if (!auth.user) {
//       return <p>You are not logged in.</p>;
//     }
  
//     return (
//       <p>
//         Welcome {auth.user}!{" "}
//         <button
//           onClick={() => {
//             auth.signout(() => navigate("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     );
//   }

//   function RequireAuth({ children }: { children: JSX.Element }) {
//     let auth = useAuth();
//     let location = useLocation();
  
//     if (!auth.user) {
//       // Redirect them to the /login page, but save the current location they were
//       // trying to go to when they were redirected. This allows us to send them
//       // along to that page after they login, which is a nicer user experience
//       // than dropping them off on the home page.
//       return <Navigate to="/login" state={{ from: location }} replace />;
//     }
  
//     return children;
//   }
  
//   function LoginPage() {
//     let navigate = useNavigate();
//     let location = useLocation();
//     let auth = useAuth();
  
//     let from = location.state?.from?.pathname || "/";
  
//     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//       event.preventDefault();
  
//       let formData = new FormData(event.currentTarget);
//       let username = formData.get("username") as string;
  
//       auth.signin(username, () => {
//         // Send them back to the page they tried to visit when they were
//         // redirected to the login page. Use { replace: true } so we don't create
//         // another entry in the history stack for the login page.  This means that
//         // when they get to the protected page and click the back button, they
//         // won't end up back on the login page, which is also really nice for the
//         // user experience.
//         navigate(from, { replace: true });
//       });
//     }
  
//     return (
//       <div>
//         <p>You must log in to view the page at {from}</p>
  
//         <form onSubmit={handleSubmit}>
//           <label>
//             Username: <input name="username" type="text" />
//           </label>{" "}
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   }
  
//   function PublicPage() {
//     return <h3>Public</h3>;
//   }
  
//   function ProtectedPage() {
//     return <h3>Protected</h3>;
//   }
  

const App = () => {
    const [user, setUser]: any = useState(null);
    useEffect(()=> {
        console.log('useEffect line 172 App.tsx is hit');
        const getUser = async ()=> {
            console.log('useEffect')
            fetch("http://localhost:3000/auth/login/success",
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": 'true',
                },
            }   
            ).then((response) => {
                console.log('line 187 response: ', response)
                if (response.status === 200) return response.json();
                throw new Error ("authentication has been failed!")
            }).then(resObject=> {
                // setUser(true)
                setUser(resObject.user)
            }).then(err => {
                console.log('error from main page', err);
            })
        }
        getUser();
    }, []);

    return (
        <Router>
                <Routes>
                    {/* <Route path="/" element={<Navigate to="/signIn" />} /> */}
                    <Route path="/" element={ user ? <Navigate to="/dashboard"/> : <SignIn />} />
                    <Route path="/dashboard" element={<Main />} />
                </Routes>
        </Router>
    );
};

export default hot(App);

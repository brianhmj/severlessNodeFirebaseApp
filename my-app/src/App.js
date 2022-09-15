import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

//Firebase imports
import { auth } from './firebase-config'
import { signOut } from "firebase/auth";

//Pages for the application
import HomePg from "./pages/HomePg";
import PostPg from "./pages/PostPg";
import LoginPg from "./pages/LoginPg";

function App() {
 const [authState, setAuthState] = useState(localStorage.getItem("authState"));

 const signMeOut = () => {
   signOut(auth).then(() => {
       localStorage.clear();
       setAuthState(false);
   });
 };

 return (
   <Router>
       <nav>
           <Link to="/"> Home </Link>
           {!authState && ( <Link to="/login"> Login </Link> )}
           {authState && (
               <>
                 <Link to="/post"> Post </Link>
                 <button onClick={signMeOut}> Log Out </button>
               </>
           )}
       </nav>
       <Routes>
           <Route path="/" element={<HomePg authState={authState}/>} />
           <Route path="/post" element={<PostPg authState={authState}/> } />
           <Route path="/login" element={<LoginPg setAuthState={setAuthState}/> } />
       </Routes>
   </Router>
 );
}

export default App;
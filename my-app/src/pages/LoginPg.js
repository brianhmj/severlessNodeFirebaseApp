import React from "react";
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';

function LoginPg({setAuthState}) {

   const signingIn = () => {
       signInWithPopup(auth, provider).then((result) => {
           localStorage.setItem("authState", true);
           setAuthState(true);
       });
   };

   return (
     <div className="Login">
         <p>Sign In!</p>
         <button onClick={signingIn}> Google Sign In </button>
     </div>
   );

}
 export default LoginPg;
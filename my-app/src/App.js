import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePg from "./pages/HomePg";
import PostPg from "./pages/PostPg";
import LoginPg from "./pages/LoginPg";

function App() {
 return (
   <Router>
       <nav>
           <Link to="/"> Home </Link>
           <Link to="/login"> Login </Link>
           <Link to="/post"> Post </Link>
       </nav>
       <Routes>
           <Route path="/" element={<HomePg/>} />
           <Route path="/post" element={<PostPg/> } />
           <Route path="/login" element={<LoginPg/> } />
       </Routes>
   </Router>
 );
}

export default App;
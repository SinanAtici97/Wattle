import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { useContext } from "react";
import { 
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate
} from "react-router-dom"; //Old syntax is Switch, new syntax is Routes.
import { AuthContext } from "./context/AuthContext";

// Changed syntax of "Switch" => "Routes" and "Redirect" =>"Navigate"

function App() {

  const {user} = useContext(AuthContext)
  return (
<Router>
    <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login /> }/> 
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register /> }/>
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger /> }/>
        <Route path="/" element={user ? <Home /> : <Register />}/>
        <Route path="/profile/:username" element={ <Profile /> }/>
    </Routes>
</Router>
  );
}

export default App;

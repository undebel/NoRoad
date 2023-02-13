import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Container from "react-bootstrap/esm/Container";
import UserContext from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <Container>
        <UserContext>
          <Router>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path='register' element={<Register/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='*' element={<Navigate replace to="/"/>}/>
            </Routes>
          </Router>
        </UserContext>
      </Container>
    </div>
  );
}

export default App;

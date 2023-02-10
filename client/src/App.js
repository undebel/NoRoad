import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import NoRoad from "./components/NoRoad";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='noroad' element={<NoRoad/>}/>
          <Route path="*" element={<Navigate replace to="/"/>}/>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

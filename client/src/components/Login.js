import React from "react";
import LoginForm from "../layouts/LoginForm";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

function Login(props) {
    return (
        <>
            <NavBar/>
            <LoginForm/>
            <Footer/>
        </>
    );
}

export default Login;
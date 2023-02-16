import React from "react";
import NavBar from "../layouts/NavBar";
import RegisterForm from "../layouts/RegisterForm";
import Footer from "../layouts/Footer";

function Register(props) {
    return (
        <>
            <NavBar/>
            <RegisterForm/>
            <Footer/>
        </>
    );
}

export default Register;
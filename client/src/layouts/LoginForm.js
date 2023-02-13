import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { readFile } from "../utils/FileStore";
import { userContext } from "../contexts/UserContext";
import { loginUser } from "../services/Login";

function LoginForm(props) {
    const navigate = useNavigate();
    const context = useContext(userContext);

    const initialAlert = {
        msg: "",
        variant: ""
    };
    const [ alert, setAlert ] = useState(initialAlert);
    const [ logging, setLogging ] = useState(false);

    const showAlert = (a, seconds = 4) => {
        setAlert(a);
        setTimeout(() => {
            setAlert(initialAlert);
        }, seconds * 1000);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        let { file, password } = e.target;

        file = file.files[0];
        password = password.value;

        file = await readFile(file);
        if (!file) {
            showAlert({ msg: "Please select the noroad.conf file and try again.", variant: "danger" });
        }
        file = JSON.parse(file);

        setLogging(true);

        try {
            const data = await loginUser(file, password);

            if (data.msg) {
                setLogging(false);
                showAlert({ msg: data.msg, variant: "danger" });
                return;
            }

            setLogging(false);
            showAlert({ msg: "User successfully logged.", variant: "success" });

            context.assignUser(data);

            navigate("/dashboard");
        }
        catch (error) {
            setLogging(false);
            showAlert({ msg: "Error logging in, please check your file and try again.", variant: "danger" });
        }
    };

    return (
        <>
            <Container className="mt-1 d-flex justify-content-center w-75">
                {alert ? <Alert key={alert.variant} variant={alert.variant}>{alert.msg}</Alert> : null}
            </Container>
            <Container className="mt-1 d-flex justify-content-center w-50">
                <Form onSubmit={handleFormSubmit} className="bgForm border border-primary rounded p-5">
                    <h3 className="text-center">Login</h3>
                    <Form.Group className="mt-3">
                        <Form.Label>Select the <strong>noroad.conf</strong> file</Form.Label>
                        <Form.Control type="file" name="file"/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter your password" />
                    </Form.Group>
                    <div className="mt-4 d-flex justify-content-center">
                        {
                            logging
                            ? <Button variant="primary" type="submit">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Checking your credentials...
                            </Button>
                            : <Button variant="primary" type="submit">
                                Login
                            </Button>
                        }
                        
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                        <p className="text-center text-muted">
                            Don't have an account yet? 
                            <Link to="/register" className="fw-bold text-body">Register here</Link>
                        </p>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default LoginForm;
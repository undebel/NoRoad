import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/Register";
import { saveFile } from "../utils/FileStore";

function RegisterForm(props) {
    const navigate = useNavigate();
    const [ alert, setAlert ] = useState(null);
    const [ creating, setCreating ] = useState(false);

    const showAlert = (a, seconds = 4) => {
        setAlert(a);
        setTimeout(() => {
            setAlert(null);
        }, seconds * 1000);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        let { alias, password, confirmPassword, agree } = e.target;

        alias = alias.value;
        password = password.value;
        confirmPassword = confirmPassword.value;

        if (!agree.checked) {
            showAlert({ msg: "Please accept the Terms and Conditions before creating your account.", variant: "danger" });
            return;
        }

        setCreating(true);

        try {
            const data = await registerUser(alias, password, confirmPassword);
            if (data.msg) {
                setCreating(false);
                showAlert({ msg: data.msg, variant: "danger" });
                return;
            }

            saveFile(data);

            setCreating(false);
            showAlert({ msg: "User successfully created. Redirecting to login...", variant: "success" });

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
        catch (error) {
            setCreating(false);
            showAlert({ msg: "Error creating the account, please check your information and try again.", variant: "danger" });
        }
    };

    return (
        <>
            <Container className="mt-4 d-flex justify-content-center">
                <Alert key="info" variant="info" className="text-center text-justify">
                    <strong>ATTENTION:</strong> When you register a file called <strong>noroad.conf</strong> will be 
                    created, this file will contains your identifier and your private key.
                    <br/>
                    It is your responsibility to store the file in a safe place, you will need this file to log in 
                    and decrypt the messages you receive.
                    <br/>
                    If you lose it, you will 
                    lose access to all messages.
                    <br/>
                    <strong>NEVER SHARE THE FILE WITH ANYONE.</strong>
                </Alert>
            </Container>
            <Container className="mt-1 d-flex justify-content-center w-75">
                {alert && <Alert key={alert.variant} variant={alert.variant}>{alert.msg}</Alert>}
            </Container>
            <Container className="mt-1 d-flex justify-content-center w-50">
                <Form onSubmit={handleFormSubmit} className="bgForm border border-primary rounded p-5">
                    <h3 className="text-center">Register an account</h3>
                    <Form.Group className="mt-3">
                        <Form.Label>Alias</Form.Label>
                        <Form.Control type="text" name="alias" placeholder="Enter your alias" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter your password" />
                        <Form.Text className="text-muted">
                            Your password will be encrypted and stored as a SHA256 hash.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" placeholder="Confirm your password" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Check type="checkbox" name="agree" label="I agree with the Terms and Conditions and the Privacy Policy." />
                    </Form.Group>
                    <div className="mt-4 d-flex justify-content-center">
                        {
                            creating
                            ? <Button variant="primary" type="submit">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {' '}Generating RSA keys...
                            </Button>
                            : <Button variant="primary" type="submit">
                                Register
                            </Button>
                        }
                        
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                        <p className="text-center text-muted">
                            Have already an account?{' '}
                            <Link to="/login" className="fw-bold text-body">Login here</Link>
                        </p>
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default RegisterForm;
import React, { useContext, useState } from "react";
import { Form, FormControl, Button, Card, Alert } from "react-bootstrap";
import { userContext } from "../contexts/UserContext";
import { updateUserAlias, updateUserPassword } from "../services/Register";

function Options(props) {
    const context = useContext(userContext);
    const [ alert, setAlert ] = useState(null);
    const [ newAlias, setNewAlias ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");

    const showAlert = (a, seconds = 4) => {
        setAlert(a);
        setTimeout(() => {
            setAlert(null);
        }, seconds * 1000);
    };

    const handleNewAlias = (e) => {
        setNewAlias(e.target.value);
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const changeUserAlias = (e) => {
        e.preventDefault();

        if (newAlias === context.user.alias) {
            showAlert({ msg: "Enter a different alias than the current one.", variant: "danger" });
            return;
        }

        if (newAlias.trim() === "" || newAlias.length < 3) {
            showAlert({ msg: "Enter an alias of at least 3 characters.", variant: "danger" });
            return;
        }

        const data = updateUserAlias(context.user.id, newAlias);
        if (data.msg) {
            showAlert({ msg: data.msg, variant: "danger" });
            return;
        }

        context.assignUser({ ...context.user, alias: newAlias });
        showAlert({ msg: "Alias updated successfully!", variant: "success" });
        setNewAlias("");
    };

    const changeUserPassword = (e) => {
        e.preventDefault();

        if (newPassword.trim() === "" || newPassword.length < 6) {
            showAlert({ msg: "Enter a password of at least 6 characters.", variant: "danger" });
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert({ msg: "Passwords do not match.", variant: "danger" });
            return;
        }

        const data = updateUserPassword(context.user.id, newPassword);
        if (data.msg) {
            showAlert({ msg: data.msg, variant: "danger" });
            return;
        }

        showAlert({ msg: "Password updated successfully!", variant: "success" });
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <Card bg={context.style.cardVariant} style={{ zIndex: 1, position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Card.Body>
                <h3 className="text-center"><strong>My account</strong></h3>
                {alert && <Alert className="text-center" key={alert.variant} variant={alert.variant}>{alert.msg}</Alert>}
                <hr/>
                <h5 className="text-center"><strong>Alias:</strong> {context.user.alias}</h5>
                <h5 className="text-center"><strong>ID:</strong> {context.user.id}</h5>
                <hr/>
                <Form className="mt-4">
                    <h5>Change your alias</h5>
                    <FormControl type="text" name="alias" value={newAlias} onChange={handleNewAlias} placeholder="Enter your new alias" style={{ backgroundColor: context.style.textAreaBg }}/>
                    <div className="d-grid gap-2">
                        <Button type="submit" className="mt-3" onClick={changeUserAlias}>Change alias</Button>
                    </div>
                </Form>
                <Form className="mt-4">
                    <h5>Change your password</h5>
                    <FormControl type="password" value={newPassword} onChange={handleNewPassword} name="password" placeholder="Enter your new password" style={{ backgroundColor: context.style.textAreaBg }}/>
                    <FormControl className="mt-1" type="password" value={confirmPassword} onChange={handleConfirmPassword} name="confirmPassword" placeholder="Confirm your new password" style={{ backgroundColor: context.style.textAreaBg }}/>
                    <div className="d-grid gap-2">
                        <Button type="submit" onClick={changeUserPassword} className="mt-3">Change password</Button>
                        <Button variant="danger" onClick={props.hide}>Close</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Options;
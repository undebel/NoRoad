import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function NewRoom(props) {
    console.log("testa");
    return (
        <Form style={{ zIndex: 1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <FormControl type="text" placeholder="Enter ID" />
            <Button className='mt-2'>Search</Button>
        </Form>
    );
}

export default NewRoom;
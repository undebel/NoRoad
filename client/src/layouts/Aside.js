import React from "react";
import { Button, ListGroup } from 'react-bootstrap';

function Aside(props) {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 31, name: 'Bob Smith' },
        { id: 39, name: 'Bob Smith' },
        { id: 38, name: 'Bob Smith' },
        { id: 37, name: 'Bob Smith' },
        { id: 36, name: 'Bob Smith' },
        { id: 35, name: 'Bob Smith' },
        { id: 33, name: 'Bob Smith' },
        { id: 34, name: 'Bob Smith' },
        { id: 60, name: 'Bob Smith' },
        { id: 40, name: 'Bob Smith' },
        { id: 50, name: 'Bob Smith' },
        { id: 80, name: 'Bob Smith' }
    ];

    return (
        <>
            <Button className="w-100 mt-2">Create room</Button>
            <hr />
            <ListGroup style={{ minHeight: '60vh', maxHeight: '60vh', overflowY: 'scroll' }}>
                {users.map((user) => (
                    <ListGroup.Item key={user.id}>
                        {user.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
            <Button className="w-100">Dark mode</Button>
            <Button className="w-100 mt-2">Options</Button>
            <Button className="w-100 mt-2">Logout</Button>
        </>
    );
}

export default Aside;
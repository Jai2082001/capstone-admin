import { useState, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useEffect } from 'react';



const GenerateCredentials = () => {

    const [state, changeState] = useState(false);
    const eName = useRef();
    const eOrganizationMail = useRef();
    const eOrganizationPhone = useRef();

    useEffect(()=>{
            changeState(Math.floor(Math.random() * (9999 - 1111 + 1) ) + 1111);
    }, [])

    const volunteerController = (e) => {
        e.preventDefault();
        const dataObj = {
            name: eName.current.value,
            mail: eOrganizationMail.current.value,
            phone: eOrganizationPhone.current.value,
            secret: state
        }
        fetch(`${process.env.REACT_APP_FETCH_LINK}/organizationSave`, {
            method: "POST",
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                'addedby': 'Admin'
            },
            body: JSON.stringify(dataObj)
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
        })
        
    }

    return (
        <div>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control ref={eName} type="text" placeholder="Event Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Organization Rep Email</Form.Label>
                    <Form.Control type="text" ref={eOrganizationMail} placeholder="Event Organized By" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Organization Rep Phone Number </Form.Label>
                    <Form.Control type="text" ref={eOrganizationPhone} placeholder="Event Organized By" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Secret key</Form.Label>
                    <Form.Control type="text" value={state} />
                </Form.Group>
                

                <Button onClick={volunteerController} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default GenerateCredentials;

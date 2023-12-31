import { Dropdown, Form, Card, Button } from "react-bootstrap"
import { useState, useRef } from "react"

const VolunteerEdit = ({ healthOrgs }) => {

    const [ singleVolunteer, changeSingleVolunteer ] = useState(false);
    const [added, setAdded] = useState(false); 
    const [loading, changeLoading ] = useState(false)

    const eName = useRef('eName');
    const eDis = useRef('edis')
    const eOrganization = useRef('eName');
    const eContact = useRef('eDis')
    const ePr = useRef('ePr');
    const imageRef = useRef('Vimage');

    const selectEdit = (prop) => {
        console.log(prop)
        changeSingleVolunteer(prop);
    }

    const formUpdateController = (e) => {
        e.preventDefault();
        console.log('Health Update')
        const files = imageRef.current.files;
        if (files.length > 0) {
            const delay = (file) => {
                return new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file)
                    fileReader.onload = function (event) {
                        resolve(event.target.result);
                    };
                })
            }
            const doNextPromise = (d) => {
                delay(files[d])
                    .then(x => {
                        // array.push(x);
                        d++;
                        if (d < files.length) {
                            doNextPromise(d)
                        }
                        else {
                            const fileReader = new FileReader();
                            const file = imageRef.current.files[0];

                            fileReader.readAsDataURL(file);
                            fileReader.onload = function (event) {
                                let date = new Date();
                                let dateText = date.toLocaleDateString();
                                let dataObj = {};

                                console.log(event.target.result);

                                if(eName.current.value == ''){
                                    dataObj.HealthName = singleVolunteer.HealthName;
                                }else{
                                    dataObj.HealthName = eName.current.value
                                }
                                if(eOrganization.current.value == ''){
                                    dataObj.HealthOrganization = singleVolunteer.HealthOrganization;
                                }else{
                                    dataObj.HealthOrganization = eOrganization.current.value
                                }

                                if(eDis.current.value == ''){
                                    dataObj.HealthOrgDescription = singleVolunteer.HealthOrgDescription;
                                }else{
                                    dataObj.HealthOrgDescription = eDis.current.value
                                }
                                
                                if(ePr.current.value == ''){
                                    dataObj.HealthProDescription = singleVolunteer.HealthProDescription;
                                }else{
                                    dataObj.HealthProDescription = ePr.current.value
                                }

                                if(eContact.current.value == ''){
                                    dataObj.Contact = singleVolunteer.Contact;
                                }else{
                                    dataObj.Contact = eContact.current.value
                                }

                                
                                dataObj.image = event.target.result;
                        
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/HealthCareUpdate`, {
                                    method: "POST",
                                    cache: 'no-cache',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Accept': 'application/json',
                                        "Content-Type": 'application/json',
                                        'addedby': 'Admin',
                                        'id': singleVolunteer._id
                                    },
                                    body: JSON.stringify(dataObj)
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {
                                    changeLoading(false)
                                    console.log(response);
                                    alert("Action Done")
                                    window.location.reload()
                                    if (response.status) {
                                        setAdded({ nature: 'error', msg: 'Already in the database' });
                                    } else {
                                        setAdded({ nature: 'success', msg: 'Added In The Database' });
                                    }
                                })
                            }
                        }

                    })

            }

            doNextPromise(0);

        }else{
            let dataObj = {};
            
         
            if(eName.current.value == ''){
                dataObj.HealthName = singleVolunteer.HealthName;
            }else{
                dataObj.HealthName = eName.current.value
            }
            if(eOrganization.current.value == ''){
                dataObj.HealthOrganization = singleVolunteer.HealthOrganization;
            }else{
                dataObj.HealthOrganization = eOrganization.current.value
            }

            if(eDis.current.value == ''){
                dataObj.HealthOrgDescription = singleVolunteer.HealthOrgDescription;
            }else{
                dataObj.HealthOrgDescription = eDis.current.value
            }
            
            if(ePr.current.value == ''){
                dataObj.HealthProDescription = singleVolunteer.HealthProDescription;
            }else{
                dataObj.HealthProDescription = ePr.current.value
            }

            if(eContact.current.value == ''){
                dataObj.Contact = singleVolunteer.Contact;
            }else{
                dataObj.Contact = eContact.current.value
            }

            dataObj.image = singleVolunteer.ImageUrl;


            fetch(`${process.env.REACT_APP_FETCH_LINK}/HealthCareUpdate`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'addedby': 'Admin',
                    'id': singleVolunteer._id
                },
                body: JSON.stringify(dataObj)
            })

        }


        


    }


    return (
        <div>
            Edit


            <Dropdown data-bs-theme="dark" >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={(e) => { console.log(e) }}>

                    {healthOrgs.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => { selectEdit(singleElement) }}>{singleElement.HealthName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
            </Dropdown>

            {singleVolunteer &&

                <Form>
                    <Form.Group>
                        <Form.Label>Program Name</Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.HealthName}></Form.Control>
                        <Form.Control type='text' ref={eName}></Form.Control>

                        <Form.Label>Health Organization </Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.HealthOrganization}></Form.Control>
                        <Form.Control type='text' ref={eOrganization}></Form.Control>

                        <Form.Label>Health Organization Description </Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.HealthOrgDescription}></Form.Control>
                        <Form.Control type='text' ref={eDis}></Form.Control>

                        <Form.Label>Health Program Description </Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.HealthProDescription}></Form.Control>
                        <Form.Control type='text' ref={ePr}></Form.Control>

                        <Form.Label>Contact info </Form.Label>
                        
                        <Form.Control type='text' readOnly value={singleVolunteer.Contact}></Form.Control>
                        <Form.Control type='text' ref={eContact}></Form.Control>

                        
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top"  />
                            <Card.Body>
                                <Card.Img src={singleVolunteer.ImageUrl}></Card.Img>
                            </Card.Body>
                        </Card> 
                        <Form.Group className='mb-3'>
                            <Form.Label>Update the Image if you want</Form.Label>
                            <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                        </Form.Group>
                    </Form.Group>
                    <Button onClick={formUpdateController}></Button>
                </Form>
            }


        </div>
    )
}

export default VolunteerEdit
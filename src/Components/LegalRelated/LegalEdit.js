import { Dropdown, Form, Card, Button } from "react-bootstrap"
import { useState, useRef } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LegalEdit = ({ orgs }) => {

    const [singleVolunteer, changeSingleVolunteer] = useState(false);
    const [added, setAdded] = useState(false);
    const [loading, changeLoading] = useState(false)

    const eName = useRef('eName');
    const eDis = useRef('eDis');
    const eContact = useRef('eContact');
    const eOrg = useRef('eOrg');
    const ePro = useRef('ePro');
    const imageRef = useRef('Vimage');

    const selectEdit = (prop) => {
        console.log(prop)
        changeSingleVolunteer(prop);
    }

    const formUpdateController = (e) => {
        e.preventDefault();

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

                                if (eName.current.value == '') {
                                    dataObj.LegalOrgName = singleVolunteer.LegalOrgName;
                                } else {
                                    dataObj.LegalOrgName = eName.current.value;
                                }

                                if (ePro.current.value == '') {
                                    dataObj.LegalProName = singleVolunteer.LegalProName;
                                } else {
                                    dataObj.LegalProName = ePro.current.value;
                                }

                                if (eDis.current.value == '') {
                                    dataObj.LegalProDescription = singleVolunteer.LegalProDescription;
                                } else {
                                    dataObj.LegalProDescription = eDis.current.value;
                                }

                                if (eOrg.current.value == '') {
                                    dataObj.LegalOrgDescription = singleVolunteer.LegalOrgDescription;
                                } else {
                                    dataObj.LegalOrgDescription = eOrg.current.value;
                                }

                                if (eContact.current.value == '') {
                                    dataObj.ContactInfo = singleVolunteer.ContactInfo;
                                } else {
                                    dataObj.ContactInfo = eContact.current.value;
                                }


                                dataObj.image = event.target.result;

                                fetch(`${process.env.REACT_APP_FETCH_LINK}/updateLegalOrg`, {
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
                                  
                                    
                                })
                            }
                        }

                    })

            }

            doNextPromise(0);

        } else {
            toast.error('Insert an image', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

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

                    {orgs.map((singleElement) => {
                        return (
                            <Dropdown.Item onClick={() => { selectEdit(singleElement) }}>{singleElement.LegalOrgName}</Dropdown.Item>
                        )
                    })}

                </Dropdown.Menu>
            </Dropdown>

            {singleVolunteer &&

                <Form>
                    <Form.Group>
                            <Form.Label>Legal Program Name</Form.Label>
                            <Form.Control readOnly value={singleVolunteer.LegalProName} type="text" placeholder="Event Name" />
                            <Form.Control ref={ePro}  placeholder="Event Name" />


                            <Form.Label>Legal Organization Name</Form.Label>
                            <Form.Control readOnly value={singleVolunteer.LegalOrgName} type="text" placeholder="Event Name" />
                            <Form.Control ref={eName} type="text" placeholder="Event Name" />

                            <Form.Label>Legal Program Descripition</Form.Label>
                            <Form.Control readOnly value={singleVolunteer.LegalProDescription} type="text" placeholder="Event Name" />
                            <Form.Control ref={eDis} type="text" placeholder="Event Name" />


                            <Form.Label>Legal Organization Description</Form.Label>
                            <Form.Control type="text" readOnly value={singleVolunteer.LegalOrgDescription} placeholder="Descripition" />
                            <Form.Control type="text" ref={eOrg} placeholder="Descripition" />


                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control type="text" readOnly value={singleVolunteer.ContactInfo} placeholder="Descripition" />
                            <Form.Control type="text" ref={eContact} placeholder="Enter Contact info" />
                        
                        <Form.Group className='mb-3'>
                            <Form.Label>Insert the Image</Form.Label>
                            <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                        </Form.Group>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" />
                            <Card.Body>
                                <Card.Img src={singleVolunteer.ImageUrl}></Card.Img>
                            </Card.Body>
                        </Card>
                        

                        <Form.Group className='mb-3'>
                            <Form.Label>Update the Image if you want</Form.Label>
                            <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                        </Form.Group>

                    </Form.Group>
                    <Button onClick={formUpdateController}>Update Legal Stuff</Button>
                </Form>
            }


        </div>
    )
}

export default LegalEdit
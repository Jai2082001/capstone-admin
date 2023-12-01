import { Form, Button, Modal, Spinner } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import HealthCareDelete from '../Components/HealthCareRelated/HealthCareDelete';
import HealthCareEdit from '../Components/HealthCareRelated/HealthCareEdit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const VolunteerOpportunites = () => {

    const eName = useRef('eName');
    const eDis = useRef('edis')
    const eOrganization = useRef('eName');
    const eContact = useRef('eDis')
    const ePr = useRef('ePr');
    const imageRef = useRef('Vimage');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [healthOrgs, changeHealthOrgs] = useState([]);


    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayHealthCare`, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeHealthOrgs(response)
            changeLoading(false)
        })
    }, [])

    const volunteerController = (e) => {
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
                                let dataObj;
                                let messages = [];
                                if (eName.current.value.length < 3) {
                                    messages.push('Enter a value more than three characters')
                                }
                                if (eOrganization.current.value.length < 5) {
                                    messages.push('Enter a valid value for organization')
                                }

                                if (eDis.current.value.length < 10) {
                                    messages.push('Enter a valid value for organization')
                                }

                                if (ePr.current.value.length < 10) {
                                    messages.push('Enter a valid value for organization')
                                }
                                if (eContact.current.value.length < 10) {
                                    messages.push('Enter a valid value for organization')
                                }



                                console.log(event.target.result);

                                dataObj = {
                                    HealthName: eName.current.value,
                                    HealthOrganization: eOrganization.current.value,
                                    HealthDescription: eDis.current.value,
                                    HealthPr: ePr.current.value,
                                    contact: eContact.current.value,
                                    image: event.target.result,
                                    dateadded: dateText,
                                    AddedBy: 'Admin'
                                }
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/HealthCareSave`, {
                                    method: "POST",
                                    cache: 'no-cache',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Accept': 'application/json',
                                        "Content-Type": 'application/json',
                                        'addedby': 'Admin'
                                    },
                                    body: JSON.stringify(dataObj)
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {
                                    changeLoading(false)
                                    if (response.status == 'error') {
                                        toast.error(response.message, {
                                            position: "top-center",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    } else {
                                        toast.success('Saved', {
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
                                })
                            }
                        }

                    })

            }

            doNextPromise(0);

        } else {
            toast.error('Saved', {
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

            <Modal
                backdrop='static'
                show={loading}
            >
                <Modal.Body>
                    <Spinner animation='border' ></Spinner>
                </Modal.Body>

            </Modal>
            <input type='text' onChange={(e) => { changePage(e.target.value) }}></input>

            {page == 'add' &&
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Program Name </Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Health Organization</Form.Label>
                        <Form.Control type="text" ref={eOrganization} placeholder="Event Organized By" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Organization Description</Form.Label>
                        <Form.Control type="text" ref={eDis} placeholder="Descripition" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Health Program Description</Form.Label>
                        <Form.Control type="text" ref={ePr} placeholder="Descripition" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control type="text" ref={eContact} placeholder="Descripition" />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Insert the Image</Form.Label>
                        <Form.Control type='file' accept={".jpeg, .gif, .png, .avif"} ref={imageRef} placeholder='Enter the image'></Form.Control>
                    </Form.Group>
                    <Button onClick={volunteerController} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            }

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />




            {page == 'edit' &&

                <HealthCareEdit healthOrgs={healthOrgs}></HealthCareEdit>
            }

            {page == 'delete' &&
                <HealthCareDelete healthOrgs={healthOrgs}></HealthCareDelete>
            }



        </div>
    )
}

export default VolunteerOpportunites
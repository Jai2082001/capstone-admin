import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import VolunteerDelete from '../Components/VolunteerRelated/VolunteerDelete';
import VolunteerEdit from '../Components/VolunteerRelated/VolunteerEdit';
import VolunteerDisplay from '../Components/VolunteerRelated/VolunteerDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const VolunteerOpportunites = () => {

    const eName = useRef('eName');
    const eOrganization = useRef('eName');
    const vNeed = useRef('eName');
    const vPresent = useRef('eName');
    const eDis = useRef('eDis')
    const imageRef = useRef('Vimage');
    const eCon = useRef('eCon');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [volunteers, changeVolunteers] = useState([]);



    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayVolunteer`, {
            method: 'GET',
            mode: 'cors'
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            changeVolunteers(response)
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

                                console.log(event.target.result);
                                let messages = [];
                                if (eName.current.value.length < 3) {
                                    messages.push('Enter a valid event name')
                                }
                                if (eOrganization.current.value.length < 3) {
                                    messages.push('Enter a valid event organization')

                                }
                                if (eDis.current.value.length < 3) {
                                    messages.push('Enter a valid event Descripion')

                                }

                                if (!parseInt(vNeed.current.value)) {
                                    messages.push('Enter valid volunteers needed figure')
                                } else {
                                    if (parseInt(vNeed.current.value <= 0)) {
                                        messages.push('Enter a number greater than zero')
                                    }
                                }
                                if (!parseInt(vPresent.current.value)) {
                                    messages.push('Enter valid volunteers currently present')
                                } else {
                                    if (parseInt(vNeed.current.value <= 0)) {
                                        messages.push('Enter a number greater than zero')
                                    }
                                }
                                if (eCon.current.value.length < 1) {
                                    messages.push('Enter valid contact details')
                                }

                                if (messages.length > 0) {
                                    for (let i = 0; i < messages.length; i++) {
                                        toast.error(messages[i], {
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
                                    messages = []
                                } else {
                                    dataObj = {
                                        eventName: eName.current.value,
                                        eventOrganization: eOrganization.current.value,
                                        eventDescription: eDis.current.value,
                                        vNeed: vNeed.current.value,
                                        vPresent: vPresent.current.value,
                                        image: event.target.result,
                                        AddedBy: 'Admin',
                                        contactInfo: eCon.current.value,
                                        dateadded: dateText,
                                    }
                                    fetch(`${process.env.REACT_APP_FETCH_LINK}/volunteerSave`, {
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
                                        console.log(response);
                                        // alert("Action Done")
                                        // window.location.reload()
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
                                            toast.success('Successfully done', {
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

            <Modal
                backdrop='static'
                show={loading}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don not even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            <input type='text' onChange={(e) => { changePage(e.target.value) }}></input>

            {page == 'display' &&
                <VolunteerDisplay volunteers={volunteers}></VolunteerDisplay>
            }

            {page == 'add' &&
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Event Organized By: -</Form.Label>
                        <Form.Control type="text" ref={eOrganization} placeholder="Event Organized By" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Volunteers Needed</Form.Label>
                        <Form.Control type="text" ref={vNeed} placeholder="Volunteers Needed" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Volunteers Presently Signed Up</Form.Label>
                        <Form.Control type="text" ref={vPresent} placeholder="Volunteers Presently signed" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control type="text" ref={eDis} placeholder="Descripition" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contact Information</Form.Label>
                        <Form.Control type="text" ref={eCon} placeholder="Contact Information" />
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

                <VolunteerEdit volunteers={volunteers}></VolunteerEdit>
            }

            {page == 'delete' &&
                <VolunteerDelete volunteers={volunteers}></VolunteerDelete>
            }



        </div>
    )
}

export default VolunteerOpportunites
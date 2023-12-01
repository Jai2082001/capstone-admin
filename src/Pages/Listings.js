import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import ListingsDelete from '../Components/ListingsRelated/ListingsDelete';
import ListingsEdit from '../Components/ListingsRelated/ListingsEdit';

const VolunteerOpportunites = () => {

    const eName = useRef('eName');
    const eOrganization = useRef('eName');
    const vNeed = useRef('eName');
    const vPresent = useRef('eName');
    const imageRef = useRef('Vimage');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [volunteers, changeVolunteers] = useState([]);


    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayListings`, {
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

                                dataObj = {
                                    JobTitle: eName.current.value,
                                    SkillDescription: eOrganization.current.value,
                                    JobAvailability: vNeed.current.value,
                                    JobDescription: vPresent.current.value,
                                    dateadded: dateText,
                                }
                                fetch(`${process.env.REACT_APP_FETCH_LINK}/listingsSave`, {
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

            {page == 'add' &&
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control ref={eName} type="text" placeholder="Event Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Skill Descripition</Form.Label>
                        <Form.Control type="text" ref={eOrganization} placeholder="Event Organized By" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Job Availability</Form.Label>
                        <Form.Control type="text" ref={vNeed} placeholder="Volunteers Needed" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control type="text" ref={vPresent} placeholder="Volunteers Presently signed" />
                    </Form.Group>
                    <Button onClick={volunteerController} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            }



            {page == 'edit' &&
                <ListingsEdit></ListingsEdit>
                // <VolunteerEdit volunteers={volunteers}></VolunteerEdit>
            }

            {page == 'delete' &&
                <ListingsDelete></ListingsDelete>
                // <VolunteerDelete volunteers = {volunteers}></VolunteerDelete>
            }



        </div>
    )
}

export default VolunteerOpportunites
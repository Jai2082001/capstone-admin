import { Form, Button, Modal } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import PermissionComponent from '../Components/PermissionComponent/PermissionComponent';

const VolunteerOpportunites = () => {

    const eName = useRef('eName');
    const eOrganization = useRef('eName');
    const vNeed = useRef('eName');
    const vPresent = useRef('eName');
    const eDis = useRef('eDis')
    const imageRef = useRef('Vimage');

    const [msg, setAdded] = useState({});
    const [loading, changeLoading] = useState(false);
    const [page, changePage] = useState('add');
    const [volunteer, changeVolunteers] = useState([]);


    useEffect(() => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayPermissions`, {
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
            
            {volunteer.length > 0 && 
            <div >
                {volunteer.map((single)=>{
                    return <PermissionComponent permission={single}></PermissionComponent>
                })}
            </div>
                }

        </div>
    )
}

export default VolunteerOpportunites
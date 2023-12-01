import classes from './SingleVolunteer.module.css'
import { Card, ListGroup, Accordion } from 'react-bootstrap'


const SingleVolunteer = ({ single }) => {
    return (
        <div className={classes.singleVolunteer}>
            <Card >
                <Card.Img variant="top" src={`${single.ImageUrl}`} />
                <Card.Body>
                    <Card.Title>{single.EventName}</Card.Title>
                    <Card.Text>
                        {single.EventDescription}
                    </Card.Text>
                    <Card.Text>
                        Organized by: - {single.EventOrganization}
                    </Card.Text>
                    <Card.Text>
                        Present members: - {single.VolunteersPresent}
                    </Card.Text>
                    <Card.Text>
                        Members needed: - {single.VolunteersNeed}
                    </Card.Text>

                </Card.Body>
                Enrolled Members
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Enrolled Members</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup className="list-group-flush">
                                {single.Enrolled && 
                                    single.Enrolled.map((single)=>{
                                        return (
                                        <ListGroup.Item>
                                            <p>Name: - {single.name}</p>
                                            <p>Phone number: - {single.phonenumber}</p>
                                            <p>Country : - {single.country}</p>
                                            <p>Province : - {single.province}</p>
                                            <p>City : - {single.city}</p>
                                            <p>email : - {single.email}</p>

                                        </ListGroup.Item>

                                       
                                        )
                                    })
                                    }
                    
                            </ListGroup>
                         
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

            </Card>
        </div>
    )
}

export default SingleVolunteer
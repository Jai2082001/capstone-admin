import { Card, ListGroup, Accordion } from 'react-bootstrap'


const SingleShelter = ({ single }) => {
    return (
        <div>
            <Card >
                <Card.Img variant="top" src={`${single.ImageUrl}`} />
                <Card.Body>
                    <Card.Title>{single.ShelterName}</Card.Title>
                    <Card.Text>
                        {single.ShelterDescription}
                    </Card.Text>
                    <Card.Text>
                        Resident Capacity: - {single.ResidentCapacity}
                    </Card.Text>
                    <Card.Text>
                        Resident Present members: - {single.ResidentPresentMembers}
                    </Card.Text>


                </Card.Body>
                Enrolled Members
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Enrolled Members</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup className="list-group-flush">
                                {single.Enrolled &&
                                    single.Enrolled.map((single) => {
                                        return (
                                            <ListGroup.Item>
                                                <p>Name: - {single.profile.name}</p>
                                                <p>Phone number: - {single.profile.phonenumber}</p>
                                                <p>Country : - {single.profile.country}</p>
                                                <p>Province : - {single.profile.province}</p>
                                                <p>City : - {single.profile.city}</p>
                                                <p>email : - {single.profile.email}</p>
                                                <p>For whom: - {single.person}</p>
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

export default SingleShelter
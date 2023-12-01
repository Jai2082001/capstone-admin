import { useEffect } from "react";
import SingleShelter from "./SingleShelter";
import { Row, Col } from "react-bootstrap";

const VolunteerDisplay = ({ volunteers }) => {

    return (
        <div className="mt-5 ms-5">
            <Row>
                {volunteers.map((single) => {
                    return (
                        <Col lg={'3'}>
                            <div>
                                <SingleShelter single={single}></SingleShelter>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default VolunteerDisplay;
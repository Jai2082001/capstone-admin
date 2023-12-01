import { useEffect } from "react";
import SingleVolunteer from './SingleVolunteer/SingleVolunteer'
import { Row, Col } from "react-bootstrap";

const VolunteerDisplay = ({volunteers}) => {
    
    
    return (
        <div className="mt-5 ms-5">
            <Row>
            {volunteers.map((single)=>{
                return (
                    <Col lg={'3'}>
                    <div>
                        <SingleVolunteer single={single}></SingleVolunteer>
                    </div>
                    </Col>
                )
            })}
            </Row>
        </div>
    )
} 

export default VolunteerDisplay;
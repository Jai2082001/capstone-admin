import classes from './Navbar.module.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
    return (
        <div className={classes.parentNav}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Home">Home</Nav.Link>
                            <Nav.Link href="/VolunteerOpportunities">Volunteer Opportunites</Nav.Link>
                            <Nav.Link href="/ShelterLocator">Shelter Locator</Nav.Link>
                            <Nav.Link href="/HealthAccess">Health Access</Nav.Link>
                            <Nav.Link href="/LegalOrganization">Legal Organization</Nav.Link>
                            <Nav.Link href="/CaseManagement">Case Management</Nav.Link>
                            <Nav.Link href="/BlogPage">Blog Page</Nav.Link>
                            <Nav.Link href="/GenerateCredentials">Generate credentials</Nav.Link>
                            <Nav.Link href="/Listings">Job Listings</Nav.Link>
                            <Nav.Link href="/Donations">Donations</Nav.Link>
                            <Nav.Link href='/permissions'>Permissions</Nav.Link>
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;
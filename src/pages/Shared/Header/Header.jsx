import { useContext } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProviders";

function Header() {
    const { user, logOut } = useContext(AuthContext);
    const logoutBtn = () => {
        logOut();
    };
    return (
        <Navbar
            bg="light"
            expand="lg"
            className="bg-light container mb-3 navbar navbar-expand-lg navbar-light"
        >
            <Container fluid>

                <Navbar.Brand className="fw-bold">
                    <Link to="/" className="nav-link">Nifty</Link>
                </Navbar.Brand>


                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>

                    
                        <Nav.Item>
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/payment" className="nav-link">Payment</Link>
                        </Nav.Item>
                        {
                            user ? <Nav.Item>
                                <span onClick={logoutBtn} className="btn">Log Out</span>
                            </Nav.Item> : <Nav.Item>
                                <Link to="/login" className="nav-link">Login</Link>
                            </Nav.Item>
                        }



                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

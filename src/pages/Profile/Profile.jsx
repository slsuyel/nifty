import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProviders';
import { baseUrl } from '../../baseUrl/baseUrl';
import { Button, Card, Container, Modal, Form, } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [plan, setPlan] = useState([]);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const { user } = useContext(AuthContext);
    const email = user?.email;

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(`${baseUrl}/currentUser?email=${email}`);
                const data = await response.json();
                setCurrentUser(data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        fetchCurrentUser();
    }, [email]);

    useEffect(() => {
        fetch(`${baseUrl}/payments?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                setPlan(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [email])




    const handleModalOpen = () => {
        setShowModal(true);
        setName(currentUser[0].name);
        setGender(currentUser[0].gender);
        setDateOfBirth(currentUser[0].dateOfBirth);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleUpdateProfile = async () => {
        const updatedData = {
            email: email,
            name: name,
            gender: gender,
            dateOfBirth: dateOfBirth,
        };

        try {
            const response = await fetch(`${baseUrl}/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User profile updated successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                });

                fetchCurrentUser();
            } else {
                console.error('Error updating user profile');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
        handleModalClose();
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await fetch(`${baseUrl}/currentUser?email=${email}`);
            const data = await response.json();
            setCurrentUser(data);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    useEffect(() => {
        AOS.init(); 
    }, []);

    return (
        <Container>
            <Card data-aos="fade-up"
                data-aos-anchor-placement="center-center">
                <Card.Body>
                    <Card.Title className="text-center">Your Profile</Card.Title>
                    <Card.Title className="text-center">Your email : {email}</Card.Title>
                    {currentUser.length > 0 ? (
                        <div className="d-flex justify-content-around flex-md-row flex-column">
                            <div>
                                <h3>Name: <span className=' fs-4 text-primary'> {currentUser[0].name}</span></h3>
                                <h3>Gender: <span className=' fs-4 text-primary'>{currentUser[0].gender}</span></h3>
                                <h3>Date of Birth: <span className=' fs-4 text-primary'> {currentUser[0].dateOfBirth}</span></h3>
                                <Button variant="primary" onClick={handleModalOpen}>
                                    Update Profile
                                </Button>
                            </div>
                            <div className="border border-danger-subtle my-3"></div>
                            <div>
                                <h3>Your current plan</h3>
                                {
                                    plan?.length > 0 ? <>
                                        <h1 className='border border-info my-t p-2 rounded-1'>PREMIUM
                                            <sub className='font-monospace fs-4 text-danger'>activated</sub>
                                            <br />
                                        </h1>


                                    </>

                                        : <>  <p className='text-danger'>Currently you dont have any Plan</p>
                                            <Link to='/payment'>
                                                <Button variant="info">Buy Plan</Button>
                                            </Link>

                                        </>
                                }

                            </div>
                        </div>
                    ) : (
                        <div> <p>Please Login to view your profile</p> </div>

                    )}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="dateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProfile}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Profile;

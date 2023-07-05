import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Plan = () => {
    useEffect(() => {
        AOS.init(); // Initialize AOS
    }, []);
    return (
        <div>
            <h1 className="text-center my-4">★ Choose the plan that’s right for you </h1>

            <Card data-aos="fade-up"
                data-aos-anchor-placement="center-center" className="col-3 mx-auto border-0 shadow-lg" style={{ backgroundImage: 'linear-gradient(to right top, #d16ba5, #b26ba7, #936aa2, #776797, #606287, #5b6b8f, #577495, #547d9a, #519bb9, #4cbbd3, #4cdbe5, #5ffbf1)' }}>
                <Card.Body className=" fs-6 text-white shadow-lg">
                    <Card.Title className="text-center">PREMIUM</Card.Title>
                    <Card.Text>
                        4K + HDR
                    </Card.Text>
                    <Card.Text>
                        Resolution: 4K (Ultra HD) + HDR
                    </Card.Text>
                    <Card.Text>
                        Video Quality: Best
                    </Card.Text>
                    <Card.Text className="border btn fw-bolder text-info text-uppercase w-100">
                        Price : $ 10
                    </Card.Text>
                    <div className="text-center">

                        <Link to={`/payment/10`} >
                            <Button className="w-50">Buy Now</Button>
                        </Link>

                    </div>
                </Card.Body>
            </Card>

        </div>
    );
};

export default Plan;
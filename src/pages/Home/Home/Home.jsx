import { useEffect } from "react";
import { Container } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
const Home = () => {
    useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);
    
    return (
        <Container>
            <div data-aos="zoom-in" className="row  mx-auto w-100 align-items-center my-4">
                <div className="col-md-6">
                    <h1>  Enjoy on your TV</h1>
                    <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                </div>
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/flagged/photo-1572609239482-d3a83f976aa0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="" className="img-fluid" />

                </div>
            </div>
            <div data-aos="flip-up" className="row  mx-auto w-100 align-items-center mt-4">
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/photo-1547194936-28214bd75193?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGFuaW1hdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h1>Create profiles</h1>
                    <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                </div>

            </div>
        </Container>
    );
};

export default Home;
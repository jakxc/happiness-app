import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import registerImg from "../../assets/sunset-img.jpg"
import "./styles.css"

const Register = ({ apiUrl }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setError(false);
        setIsLoading(true);

        const url = `${apiUrl}/user/register`;
        return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
          },
          body: JSON.stringify({ 
                email: formData.email, 
                password: formData.password 
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(true);
            } 

            setMessage(data.message);
            setFormData({email: "", password: ""});
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    };

    return (
        <Container fluid='sm' className="mt-5 pt-5">
            <Row>
                <Col sm={12} md={6}>
                    {/* https://pixabay.com/illustrations/sunset-anime-minimal-nature-sky-7628294/ */}
                    <img className="register-img | rounded-5" src= {registerImg} alt="Background with girl"></img>
                </Col>
                <Col sm={12} md={6}>
                    <h3 className="color-primary">Create your account</h3>
                    {isLoading && <div className="d-flex justify-content-start my-2"><Spinner /></div>}
                    {message && <Alert type={error ? "error" : "success"} message={message} onClose={() => setMessage("")} />}
                    <form className="d-flex flex-column gap-3">
                    <div className="d-flex flex-column">
                            <label className="form-label" htmlFor="emailInput">Email address</label>
                            <input 
                                type="email" 
                                id="emailInput" 
                                placeholder="Enter email address" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label className="form-label" htmlFor="passwordInput">Password</label>
                            <input 
                                type="password" 
                                id="passwordInput" 
                                placeholder="Enter password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center text-lg-start pt-2">
                            <button className="fw-bold" onClick={handleRegister}>Create your account</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link className="color-primary" 
                            to="/login">Login here</Link></p>
                        </div>
                    </form>
                </Col>
            </Row> 
        </Container>
    )
}

export default Register;
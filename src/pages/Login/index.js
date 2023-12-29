import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import loginImg from "../../assets/man-img.jpg"
import "./styles.css"

const Login = ({  apiUrl, isLoggedIn, onLoginChanged }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("")

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setMessage("");
        setError(false);
        setIsLoading(true);

        const url = `${apiUrl}/user/login`;
        return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV"
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(true);
                setMessage(data.message);
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", formData.email)
                onLoginChanged(true);
                navigate({ pathname: "/" });
            }

            setFormData({email: "", password: ""});
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    };

    return (
        <Container fluid="sm" className="mt-5 pt-5">
            <Row>
                <Col sm={12} md={6}>
                    {/* https://pixabay.com/illustrations/man-car-anime-wallpaper-minimal-7628305/ */}
                    <img src= {loginImg} className="login-img | rounded-5" alt="Background with man"></img>
                </Col>
                <Col sm={12} md={6}>
                    {!isLoggedIn 
                    ? <>
                        <h3 className="color-primary">Log In</h3>
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
                                <button className="fw-bold" onClick={handleLogin}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link className="color-primary" 
                                to="/register">Register here</Link></p> 
                            </div>
                        </form>
                    </>
                    : <div className="color-error | mt-5 fw-bold">You are already logged in to an account. Please log out first before logging into another account.</div>}
                </Col>
            </Row> 
        </Container>
    )
}

export default Login;
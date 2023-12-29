import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

const HighlightLink = (props) => {
    return <NavLink 
                {...props}
                className="fw-bold"
                style={({ isActive }) => ({
                    color: isActive ? 'rgb(228, 228, 228)' : 'rgb(224, 136, 92)',
                  })}
            />;
}

const Header = ( { isLoggedIn, onLoginChanged } ) => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
   
    useEffect(() => {
        const onScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
    
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
      }, [])
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onLoginChanged(false);
        navigate({ pathname: "/" });
    }

    return (
        <header className={`header p-2 ${scrolled ? "scrolled" : ""}`}>
            <Navbar expand="md" className="nav">
                <Container fluid>
                    <HighlightLink to="/"><h4 className="fw-bold">World Happiness Rankings</h4></HighlightLink>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" >
                            <FontAwesomeIcon icon={faBars} />
                        </Navbar.Toggle>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto d-flex gap-3">
                                {isLoggedIn && localStorage.getItem("user") && <div className="color-primary">Welcome <span className="fw-bold">{localStorage.getItem("user")}</span>!</div>}
                                {isLoggedIn && <HighlightLink onClick={handleLogout}>
                                    Logout
                                </HighlightLink>}
                                {!isLoggedIn && <HighlightLink to="/login">
                                    Login
                                </HighlightLink>}
                                {!isLoggedIn && <HighlightLink to="/register">
                                    Register
                                </HighlightLink>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </header>
    )
}

export default Header;
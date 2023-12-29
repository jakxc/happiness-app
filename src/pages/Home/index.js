import { Container, Col, Row } from 'react-bootstrap';
import { NavLink as Link } from "react-router-dom";
import earthImg from '../../assets/earth-img.png';
import './styles.css';

const Home = ({ isLoggedIn }) => {
    return (
        <Container fluid="md" className='p-5'>
            <Row>
                <Col sm={12} md={6} className='my-auto'> 
                    <h2 className='color-primary | fw-bold'>Welcome to the World Happiness Rankings!</h2>
                    <p>What is <span className='fw-bold'>happiness</span>? Is it defined as <span className='fw-bold'>"Feeling or showing pleasure or contentment."</span> by 
                    Oxford English Dictionary. How does one accurately measure this?</p>
                    <p>The World Happiness Report does attempt to do this and convert it into meaningful data. This publication has rankings of national happiness based on respondent 
                        ratings of their own lives and correlations with various (quality of) life factors</p>
                    <p>The rankings of national happiness are achieved using a Cantril ladder survey by the polling company Gallup, Inc. In addition to ranking countries happiness levels,
                        each report has contributing authors that focus on particular themes (economy, family, health, freedom, generosity, trust). 
                        The data used to rank countries of each of these themes are gathered from various polls and surveys such as the Gallup World Poll and World Values Survey. 
                    </p>
                    { isLoggedIn ? <div className='d-flex flex-column flex-md-row gap-4'>
                        <Link to="/country-rankings"><button className='fw-bold'>Country Rankings</button></Link>
                        <Link to="/happiness-factors"><button className='fw-bold'>Happiness Factors</button></Link>
                    </div> : <Link to='/login' className='color-primary | fw-bold'>Log in to view rankings.</Link> }
                </Col>
                <Col sm={12} md={6} className='my-auto'>
                    <div className='d-flex justify-content-center'>
                        {/* https://www.cleanpng.com/png-world-population-day-7775836/ */}
                        <img src={earthImg} alt='Earth' className='img-world anim-hover'/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
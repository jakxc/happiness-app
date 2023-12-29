import linkedIn from '../../assets/linkedIn-icon.svg';
import github from '../../assets/github-icon.png';
import instagram from '../../assets/instagram-icon.svg';
import "./styles.css"

const Footer = () => {
    return (
        <footer className='footer | d-flex flex-column justify-content-center gap-3 flex-md-row-reverse justify-content-md-between align-items-center p-3'>
            <div className="social-icon | d-flex gap-3">
                <a href="https://www.linkedin.com/in/jack-chen-798696196/" className="d-inline-flex justify-content-center align-items-center"><img src={linkedIn} alt="LinkedIn" /></a>
                <a href="https://github.com/jakxc/" className="d-inline-flex justify-content-center align-items-center"><img src={github} alt="Github" /></a>
                <a href="https://www.instagram.com/ray.jxc/" className="d-inline-flex justify-content-center align-items-center"><img src={instagram} alt="Instagram" /></a>
            </div>
            <div>
                © 2023 Copyright: <a className="fw-bold" href="https://github.com/jakxc/">jakxc</a>
            </div>
        </footer>
    )
}

export default Footer;
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="fw-bold">404</h1>
                <p className="fs-3"> <span className="color-error | fw-bold">Oops!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                  <Link to="/"><button className='fw-bold'>Go Home</button></Link>
            </div>
        </div>
    )
}

export default NotFound;
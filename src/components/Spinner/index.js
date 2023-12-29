import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Spinner = ({ message }) => {
    return (
        <div className='d-flex flex-column align-items-center gap-2'>
            <FontAwesomeIcon icon={faSpinner} spin size="2xl" style={{color: "#e0885c",}} />
            {message && <p className='color-primary | fw-bold'>{message}</p>}
        </div>
    )
}

export default Spinner
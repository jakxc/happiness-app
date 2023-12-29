import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import "./styles.css"

function Alert({ message, type, onClose }) {
    return (
        <>
        {(message && message.length > 0) 
            ? <div className="custom-alert | d-flex justify-content-between align-items-center my-3" type={type}>
                <span>{ message }</span>
                <FontAwesomeIcon icon={faXmarkCircle} className="close-btn" onClick={onClose}/>
            </div>
            : null
        }
        </>
    );
}

export default Alert;
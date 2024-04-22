import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

const AlertMessage = ({ type, message, setAlertMessage }) => {
    const [isVisible, setIsVisible] = useState(true);

    let alertClass = '';

    switch (type) {
        case 'primary':
            alertClass = 'alert-primary';
            break;
        case 'secondary':
            alertClass = 'alert-secondary';
            break;
        case 'success':
            alertClass = 'alert-success';
            break;
        case 'warning':
            alertClass = 'alert-warning';
            break;
        case 'error':
            alertClass = 'alert-danger';
            break;
        default:
            alertClass = 'alert-info';
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
            setAlertMessage(null);
        }, 3000); // 9 seconds timeout

        return () => clearTimeout(timeout);
    }, [setAlertMessage]);

    return (
        <div className={`alert ${alertClass} alert-dismissible fade show ${isVisible ? 'd-block' : 'd-none'}`} role="alert">
            {message}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertMessage(null)}
            ></button>
        </div>
    );
};

AlertMessage.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    setAlertMessage: PropTypes.func.isRequired
}

export default AlertMessage;
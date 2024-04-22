import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import AlertMessage from '../components/AlertMessage';
import PropTypes from 'prop-types'; // Import PropTypes

const UserLogin = ({ closeModal, signupModal }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    try {
      dispatch(loginUser(user));
      setAlertMessage({ type: "success", message: "Welcome back dear user!!" });
      setUsername('');
      setPassword('');
      await new Promise(r => setTimeout(r, 2000));
      closeModal();
    } catch (error) {
      console.error("Error in login: ", error.message);
      setAlertMessage({ type: "success", message: "Oops!!, some error occured, please try again." });
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
  }

  return (
    <div className="modal bg-light" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  className="form-control my-2"
                  placeholder="Enter Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='username'
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control my-2"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='password'
                  required
                />
              </div>
              <div className="my-2">
                <button type="submit" className="btn btn-sm btn-primary m-2">
                  Submit
                </button>
                <button type="button" className="btn btn-sm btn-danger m-2" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
            <button type='button' className="btn btn-sm btn-primary" onClick={signupModal}>Click here to signup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserLogin.propTypes = {
  closeModal: PropTypes.func.isRequired, // Function to close the modal
  signupModal: PropTypes.func.isRequired // Function to open signup modal
};

export default UserLogin;
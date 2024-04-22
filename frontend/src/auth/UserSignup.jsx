import { useState } from 'react';
import AuthAPI from '../services/AuthAPI';
import AlertMessage from '../components/AlertMessage';
import PropTypes from "prop-types";

const UserSignup = ({ closeModal, loginModal }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [alertMessage, setAlertMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform password match validation
    if (user.password !== user.confirm_password) {
      setAlertMessage({ type: "error", message: "Password and confirm password should be same." });
      return;
    }

    try {
      await AuthAPI.SignupUser(user);
      setAlertMessage({ type: "success", message: "Account created successfully." });
      setUser({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
      });
      await new Promise(r => setTimeout(r, 3000));
      loginModal();
    } catch (error) {
      console.log(error);
      setAlertMessage({ type: "error", message: "Oops!!, some error occured, please try again." });
    }
  };

  const handleReset = () => {
    setUser({
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      first_name: '',
      last_name: '',
    });
  };
  return (
    <div className="modal bg-light" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} setAlertMessage={setAlertMessage} />}
          <div className="modal-header">
            <h5 className="modal-title">Signup</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={user.first_name}
                  onChange={handleChange}
                  autoComplete='first_name'
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={user.last_name}
                  onChange={handleChange}
                  autoComplete='last_name'
                  required
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  autoComplete='username'
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete='email'
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete='password'
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirm_password"
                  value={user.confirm_password}
                  onChange={handleChange}
                  autoComplete='confirm_password'
                  required
                />
              </div>

              <div className="mt-2">
                <button type="submit" className="btn btn-sm btn-primary m-2">
                  Sign Up
                </button>

                <button type="button" className="btn btn-sm btn-danger m-2" onClick={handleReset}>
                  Reset
                </button>

              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
            <button type='button' className="btn btn-sm btn-primary" onClick={loginModal}>Click here to login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

UserSignup.propTypes = {
  closeModal: PropTypes.func.isRequired,
  loginModal: PropTypes.func.isRequired
}

export default UserSignup;
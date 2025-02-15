import { useState } from 'react';
import BackgroundVideo from '../customComponents/backVideo';
import '../../../wwwroot/css/result.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { selectUser, setCurrentUser, setLogoutUser } from '../store/userSlice';
import { registerUser } from '../store/Middleware/registerUser';
import { loginUser } from '../store/Middleware/loginUser';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChangeAuthState = () => {
    setIsRegistering((prevState) => !prevState);
  };

  const getCurrentUser = () => {
    dispatch(setCurrentUser());
  }
  const handleRegister = async () => {
    try {
      dispatch(registerUser({email, password}));
      setMessage('Registration successful!');
      setIsRegistering(false);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error during registration.');
    }
  };

  const handleLogin = async () => {
    try {
      dispatch(loginUser({email, password}));

      setMessage(`Login successful!`);
      getCurrentUser();

      navigate('/');
    } catch (error: any) {
      setMessage('Error during login.');
    }
  };

  const handleLogout = () => {
    dispatch(setLogoutUser());
    setMessage('Logged out.');
  };

  return (
    <div className="intro">
      <BackgroundVideo />
      <div className="auth__content">
        <h1 className="textAuth">{isRegistering ? 'Register' : 'Login'}</h1>{' '}
        <input
          className="zindexAuth"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="zindexAuth"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="auth-button-container">
          <button
            className="enterButton"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>

          <button
            className="changeAuthStateButton"
            onClick={handleChangeAuthState}
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>

          {user && (
            <button className="authButton" onClick={handleLogout}>
              Logout
            </button>
          )}
          <p style={{ minHeight: '5em'}}>{message}</p>
        {user && <p>Logged in as: {user.email}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

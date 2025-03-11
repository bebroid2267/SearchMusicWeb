import { useEffect, useState } from 'react';
import BackgroundVideo from '../customComponents/backVideo';
import '../../../wwwroot/css/result.css';
import '../../../wwwroot/css/authPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch } from '../store/store';
import { selectUser, selectUserIsAuthInProcess, selectUserIsRegisteredInProcess, setCurrentUser, setLogoutUser } from '../store/userSlice';
import { registerUser } from '../store/Middleware/registerUser';
import { loginUser } from '../store/Middleware/loginUser';
import Loader from '../customComponents/loader';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const authInProcess = useSelector(selectUserIsAuthInProcess);
  const registeringInProcess = useSelector(selectUserIsRegisteredInProcess);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRedColorMessage, setIsRedColorMessage] = useState(false)

  const handleChangeAuthState = () => {
    setIsRegistering((prevState) => !prevState);
    setMessage('');
    setPassword('');
    setEmail('');
  };

  const getCurrentUser = () => {
    dispatch(setCurrentUser());
  }
  const handleRegister = async () => {
    try {
      dispatch(registerUser({email, password}));
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Аккаунт с данной почтой уже существует');
    }
  };

  const handleLogin = async () => {
    try {
      setMessage('');
      dispatch(loginUser({email, password}));
    } catch (error: any) {
      setIsRedColorMessage(true);
      setMessage('Неверный логин или пароль');
    }
  };

  useEffect(() => {
    if (store.getState().user.isAuth && !authInProcess) {
      setMessage(`Login successful!`);
      getCurrentUser();

      navigate('/');
    } else if (store.getState().user.isLastAuthAttemptIsFail){
      setPassword('');
      setEmail('');  
      setIsRedColorMessage(true);
      setMessage('Неверный логин или пароль');
    }
  }, [authInProcess])

  useEffect(() => {
    if (store.getState().user.isRegistered && !registeringInProcess) {
      setIsRedColorMessage(false);
      setMessage(`Регистрация прошла успешно!`);
      getCurrentUser();
    } else if (store.getState().user.isLastRegisteredAttemptIsFail){
      setIsRedColorMessage(true);
      setMessage('Аккаунт с данной почтой уже существует!');
    }

  }, [registeringInProcess])

  const handleLogout = () => {
    dispatch(setLogoutUser());
    setMessage('Logged out.');
  };

  return (
    <div className="intro">
      <BackgroundVideo />
      <div className='container-auth'>
          <div className="auth-content">
            <div className='header-text-auth'>
              <h1 className="welcome-test">{isRegistering ? 'Присоединитесь к Спайси!' : 'Приветствуем в Спайси!'}</h1>{' '}
              <h2 className='text-desc'>{isRegistering ? 'Говорят в космосе нет звука. У нас есть!' : 'Для продолжения войдите в ваш аккаунт'}</h2>
            </div>
            <div className='fields-container'>
                <div className='input-container'>
                    <p className='article-input'>Логин</p>
                    <input
                      className="input-field"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <p className='article-input'>Пароль</p>
                    <input
                      className="input-field"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="auth-button-container">
            <p 
              className="error-text" 
              style={{ color: isRedColorMessage ? 'red' : 'green' }}
            >{message}
            </p>            
              <button
                className="login-button"
                onClick={isRegistering ? handleRegister : handleLogin}
              >
                {authInProcess || registeringInProcess ? <Loader /> : isRegistering ? 'Зарегистрироваться' : 'Войти'}
              </button>

              <button
                className="change-state-button"
                onClick={handleChangeAuthState}
              >
                {isRegistering ? 'Вы уже с нами? Войти в аккаунт' : 'Нет аккаунта? Зарегистрироваться'}
              </button>

              {user && (
                <button className="authButton" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default AuthPage;

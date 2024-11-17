import { useState, useEffect } from 'react';
import { register, login, getCurrentUser, logout } from '../auth/authService';
import BackgroundVideo from '../customComponents/backVideo';
import '../../../wwwroot/css/result.css';
import { useNavigate } from 'react-router-dom';
import MainPanel from '../customComponents/mainPanel';

const AuthPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null); // Состояние для текущего пользователя
  const [isRegistering, setIsRegistering] = useState(false); // Состояние для переключения между авторизацией и регистрацией

  const handleChangeAuthState = () => {
    setIsRegistering((prevState) => !prevState); // Переключение состояния
  };

  useEffect(() => {
    // Получаем текущего пользователя при монтировании компонента
    const currentUser = getCurrentUser();
    if (currentUser !== null) {
        setUser(currentUser);
    }
  }, []);  // Пустой массив зависимостей, хук сработает только один раз при монтировании

  const handleRegister = async () => {
    try {
      await register(email, password);
      setMessage('Registration successful!');
      setIsRegistering(false);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error during registration.');
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      setMessage(`Login successful! Token: ${data.token}`);
      const currentUser = getCurrentUser(); // Получаем пользователя после логина
      setUser(currentUser);
      navigate("/");

    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Error during login.');
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out.');
    setUser(null); // Очистить состояние пользователя после логаута
  };

  return (
    <div className='intro'>
      <BackgroundVideo />
      <MainPanel />
      <div className='auth__content'>
        <h1 className='textAuth'>{isRegistering ? 'Register' : 'Login'}</h1> {/* Меняется в зависимости от состояния */}
        
        <input
          className='zindexAuth'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='zindexAuth'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='button-container'>
            {/* Кнопка, которая меняется в зависимости от состояния */}
            <button 
              className='enterButton' 
              onClick={isRegistering ? handleRegister : handleLogin}
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
            
            {/* Кнопка для переключения между регистрацией и авторизацией */}
            <button 
              className='changeAuthStateButton'
              onClick={handleChangeAuthState}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>

            {/* Кнопка выхода, показывается только если пользователь авторизован */}
            {user && (
              <button 
                className='authButton'
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
        </div>  
        {message && <p>{message}</p>}
        {user && <p>Logged in as: {user.email}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
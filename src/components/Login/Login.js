import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica si se han ingresado datos
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña');
      return;
    }

    // Credenciales ficticias para las pruebas
    const adminCredentials = { email: 'admin@mecanicos.com', password: 'admin' };
    const mecanicoCredentials = { email: 'mecanico@mecanicos.com', password: 'mecanico' };

    // Verifica las credenciales aquí
    if (email === adminCredentials.email && password === adminCredentials.password) {
      navigate('/Mecanicos');
    } else if (email === mecanicoCredentials.email && password === mecanicoCredentials.password) {
      navigate('/VistaMec');
    } else {
      // Muestra un mensaje de error en la interfaz de usuario
      setError('Credenciales incorrectas');
    }

    // Llama a la función onLogin si es necesario
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Taller-TECH</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

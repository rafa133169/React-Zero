import React, { useState } from 'react';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../firebase/credenciales.js';

const auth = getAuth(firebaseApp);

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function iniciarSesion(email, password) {
    try {
      // await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setErrorMessage("Credenciales inválidas. Por favor, intenta nuevamente.");
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    setErrorMessage(""); 

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    iniciarSesion(email, password);
  }

  return (
    <div className="login-container"> 
      <div className="login-card"> 
        <div className="login-header">
          <h1 className="login-title">Iniciar Sesión</h1>
        </div>
        <form onSubmit={submitHandler} className="login-form">
          <div className="input-group"> 
            <label className="label"> 
              Correo electrónico
              <input type="email" id="email" required className="login-input" />
            </label>
          </div>
          <div className="input-group"> 
            <label className="label">
              Contraseña
              <input type="password" id="password" required className="login-input" />
            </label>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="login-footer">
          <p>¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
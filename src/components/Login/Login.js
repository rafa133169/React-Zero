import React, { useState } from 'react';
import './Login.css';

// Importa las funciones necesarias de Firebase
import firebaseApp from '../firebase/credenciales.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Importa el hook de navegación
import { useNavigate } from 'react-router-dom';

// Configura la autenticación de Firebase
const auth = getAuth(firebaseApp);

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function iniciarSesion(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
        <h1>Inicia sesión</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={submitHandler}>
          <div className="input-group"> 
            <label className="label"> 
              Correo electrónico:
              <input type="email" id="email" required />
            </label>
          </div>
          <div className="input-group"> 
            <label className="label">
              Contraseña:
              <input type="password" id="password" required />
            </label>
          </div>
          <input type="submit" value="Iniciar sesión" className="login-button" />
        </form>
      </div>
    </div>
  );
}

export default Login;

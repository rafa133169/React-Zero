import React, { useState } from 'react';
import './Login.css';
import firebaseApp from '../firebase/credenciales.js';
import {   getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Inicia sesión</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={submitHandler}>
        <label>
          Correo electrónico:
          <input type="email" id="email" required />
        </label>
        <label>
          Contraseña:
          <input type="password" id="password" required />
        </label>
        <input type="submit" value="Iniciar sesión" />
      </form>
    </div>
  );
}

export default Login;

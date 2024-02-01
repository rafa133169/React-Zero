// NavBar.js
import React from 'react';
import './Navbar.css'; // Asegúrate de importar el archivo de estilos de NavBar
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <div className="title">Taller-TECH</div>
      <Link to='/'>
      <div className="logout-button">Cerrar Sesión</div>
      </Link>
    </div>
  );
}

export default NavBar;

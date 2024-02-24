import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="sidebar">
        <div className="header-title">Taller-TECH</div>
        <div className="nav-links">
          <Link to='/vistamec' className="nav-link">
            Servicios Pendientes
          </Link>
          <Link to='/vistamecT' className="nav-link">
            Servicios terminados
          </Link>
          <Link to='/' className="nav-link">
            Cerrar Sesión
          </Link>
        </div>
    </div>
  );
}

export default Header;

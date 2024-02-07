import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">Taller-TECH</div>
        <Link to='/'>
          <button className="logout-button">Cerrar Sesión</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;

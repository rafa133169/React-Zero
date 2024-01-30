// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = ({ onLogout }) => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-title">Taller-TECH</div>
        <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Header;

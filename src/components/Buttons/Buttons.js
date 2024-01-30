import React from 'react';
import './Buttons.css';

const Buttons = ({ onViewChange }) => {
  return (
    <div className="buttons-container">
      <button className="button" onClick={() => onViewChange('Mecánicos')}>Mecánicos</button>
      <button className="button" onClick={() => onViewChange('Servicios')}>Servicios</button>
      <button className="button">Piezas</button>
    </div>
  );
}

export default Buttons;

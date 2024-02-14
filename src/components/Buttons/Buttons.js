import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Buttons.css';

const Buttons = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleButtonMouseEnter = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleButtonMouseLeave = () => {
    setSelectedButton(null);
  };

  return (
    <div className="buttons-container">
      {/* <Link
        to="/Mecanicos"
        className={`button ${selectedButton === 'Mecanicos' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('Mecanicos')}
        onMouseEnter={() => handleButtonMouseEnter('Mecanicos')}
        onMouseLeave={handleButtonMouseLeave}
      >
        Mecánicos
      </Link> */}
      <Link
        to="/Servicios"
        className={`button ${selectedButton === 'Servicios' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('Servicios')}
        onMouseEnter={() => handleButtonMouseEnter('Servicios')}
        onMouseLeave={handleButtonMouseLeave}
      >
        Servicios
      </Link>
      <Link
        to="/Piezas"
        className={`button ${selectedButton === 'Piezas' ? 'selected' : ''}`}  
        onClick={() => handleButtonClick('Piezas')}
        onMouseEnter={() => handleButtonMouseEnter('Piezas')}
        onMouseLeave={handleButtonMouseLeave}
      >
        Piezas
      </Link>
    </div>
  );
}

export default Buttons;

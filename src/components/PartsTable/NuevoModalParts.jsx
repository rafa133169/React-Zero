import React, { useState } from 'react';
import './NuevoModal.css';

const NuevoModalParts = ({ onCloseModal, onSave }) => {
  const [formData, setFormData] = useState({
    nombre_pieza: '',
    cantidad: '',
    costo: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleInputChange = (field, value) => {
    if (value.trim() === '') {
      setValidationError('Todos los campos deben llenarse.');
    } else {
      setValidationError('');
    }

    if (field === 'costo' && !/^\d*$/.test(value)) {
      return;
    }

    if (field === 'cantidad' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveClick = () => {
    if (Object.values(formData).some(value => value.trim() === '')) {
      setValidationError('Todos los campos deben llenarse.');
      return;
    }

    setValidationError('');

    onSave(formData);
    onCloseModal();
  };

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Agregar Nueva Pieza</h3>
        <div className="input-group">
          <label htmlFor="nombre_pieza">Pieza:</label>
          <input
            type="text"
            id="nombre_pieza"
            placeholder="Ingrese el nombre de la pieza"
            value={formData.nombre_pieza}
            onChange={(e) => handleInputChange('nombre_pieza', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="text"
            id="cantidad"
            placeholder="Ingrese la cantidad"
            value={formData.cantidad}
            onChange={(e) => handleInputChange('cantidad', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="costo">Precio:</label>
          <input
            type="text"
            id="costo"
            placeholder="Ingrese el precio"
            value={formData.costo}
            onChange={(e) => handleInputChange('costo', e.target.value)}
          />
        </div>
        {validationError && <div className="validation-error">{validationError}</div>}
        <div className="modal-buttons">
          <button onClick={onCloseModal}>Cancelar</button>
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default NuevoModalParts;

// EditarModal.js
import React, { useState, useEffect } from 'react';

const EditarModal = ({ part, onCloseModal, onSave }) => {
  const [formData, setFormData] = useState(part);

  useEffect(() => {
    setFormData(part);
  }, [part]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSaveClick = () => {
    onSave(formData);
    onCloseModal();
  };

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Pieza</h3>
        <div className="input-group">
          <label htmlFor="nombre_pieza">Pieza:</label>
          <input
            type="text"
            id="nombre_pieza"
            value={formData.nombre_pieza}
            onChange={(e) => handleInputChange('nombre_pieza', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="text"
            id="cantidad"
            value={formData.cantidad}
            onChange={(e) => handleInputChange('cantidad', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="costo">Precio:</label>
          <input
            type="text"
            id="costo"
            value={formData.costo}
            onChange={(e) => handleInputChange('costo', e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onCloseModal}>Cancelar</button>
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarModal;

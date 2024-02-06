// EditModal.js
import React, { useState, useEffect } from 'react';

const EditModal = ({ service, onCloseModal, onSave }) => {
  const [editedService, setEditedService] = useState(service);

  useEffect(() => {
    setEditedService(service);
  }, [service]);

  const handleInputChange = (field, value) => {
    setEditedService({
      ...editedService,
      [field]: value,
    });
  };

  const handleSaveClick = () => {
    onSave(editedService);
    onCloseModal();
  };

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Servicio</h3>
        <div className="input-group">
          <label htmlFor="servicio_nombre">Servicio:</label>
          <input
            type="text"
            id="servicio_nombre"
            value={editedService.servicio_nombre}
            onChange={(e) => handleInputChange('servicio_nombre', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={editedService.descripcion}
            onChange={(e) => handleInputChange('descripcion', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="text"
            id="precio"
            value={editedService.precio}
            onChange={(e) => handleInputChange('precio', e.target.value)}
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

export default EditModal;

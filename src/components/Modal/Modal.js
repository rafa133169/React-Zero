import React, { useState } from 'react';
import './Modal.css';


const Modal = ({ row, onCloseModal, onSave }) => {
  // Estado local para rastrear la información actualizada
  const [formData, setFormData] = useState({
    nombre: row?.nombre || '',
    correo: row?.correo || '',
    telefono: row?.telefono || '',
  });

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Función para manejar el clic en el botón "Guardar"
  const handleSaveClick = () => {
    // Llama a la función onSave pasando los datos actualizados
    onSave(row.id, formData);
    // Cierra el modal
    onCloseModal();
  };

  if (!row) {
    return null; // No hay fila seleccionada, no mostrar el modal
  }

  return (
    <div className="modal-overlay" onClick={onCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Información</h3>
        <div className="input-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder={`Nombre${row.id}`}
            value={formData.nombre}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="text"
            id="correo"
            placeholder={`Correo${row.id}`}
            value={formData.correo}
            onChange={(e) => handleInputChange('correo', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="text"
            id="telefono"
            placeholder={`Teléfono${row.id}`}
            value={formData.telefono}
            onChange={(e) => handleInputChange('telefono', e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onCloseModal}>Cancelar</button>
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

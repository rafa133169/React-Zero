import React, { useState } from 'react';
import './NewServiceModal.css';

const NewModal = ({ onCloseModal, onSave, service }) => {
  const [formData, setFormData] = useState({
    id: service ? service.id : null,
    servicio_nombre: service ? service.servicio_nombre : '',
    descripcion: service ? service.descripcion : '',
    precio: service ? service.precio : '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field, value) => {
    // Validar que en el campo "Precio" solo se ingresen números
    if (field === 'precio' && !/^\d*$/.test(value)) {
      return;
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      // Verifica que todos los campos estén llenos
      if (formData.servicio_nombre.trim() === '' || formData.descripcion.trim() === '' || formData.precio.trim() === '') {
        setErrorMessage('Todos los campos son obligatorios.');
        return;
      }

      const { id, ...formDataWithoutId } = formData;
      onSave(formDataWithoutId);
      onCloseModal();
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  const handleCloseModal = () => {
    setErrorMessage(''); // Limpia el mensaje de error al cerrar el modal
    onCloseModal();
  };
  
  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Agregar Nuevo Servicio</h3>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-group">
          <label htmlFor="serviceName">Servicio:</label>
          <input
            type="text"
            id="serviceName"
            placeholder="Ingrese el nombre del servicio"
            value={formData.servicio_nombre}
            onChange={(e) => handleInputChange('servicio_nombre', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            placeholder="Ingrese la descripción del servicio"
            value={formData.descripcion}
            onChange={(e) => handleInputChange('descripcion', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="text"
            id="price"
            placeholder="Ingrese el precio del servicio"
            value={formData.precio}
            onChange={(e) => handleInputChange('precio', e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleCloseModal}>Cancelar</button>
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default NewModal;

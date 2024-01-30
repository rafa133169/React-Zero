// ServicesModal.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ServicesModal.css';

const ServicesModal = ({ service, onCloseModal, onSave }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        serviceName: service.serviceName || '',
        description: service.description || '',
        price: service.price || 0,
      });
    }
  }, [service]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(service.id, formData);
    onCloseModal();
  };

  const handleCancel = () => {
    onCloseModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>&times;</span>
        <h2>Actualizar Servicio</h2>
        <form>
          <div className="input-group">
            <label>Servicio:</label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Precio:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={handleCancel}>Cancelar</button>
            <button type="button" onClick={handleSave}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

ServicesModal.propTypes = {
  service: PropTypes.object,
  onCloseModal: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ServicesModal;

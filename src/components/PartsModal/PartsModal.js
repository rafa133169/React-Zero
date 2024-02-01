import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PartsModal.css';

const PartsModal = ({ row, onCloseModal, onSave }) => {
  const [formData, setFormData] = useState({
    partName: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    if (row) {
      setFormData({
        partName: row.partName || '',
        quantity: row.quantity || '',
        price: row.price || '',
      });
    }
  }, [row]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(row.id, formData);
    onCloseModal();
  };

  const handleCancel = () => {
    onCloseModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>&times;</span>
        <h2>Editar Información</h2>
        <form>
          <div className="input-group">
            <label>Pieza:</label>
            <input
              type="text"
              name="partName"
              value={formData.partName}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Cantidad:</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
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

PartsModal.propTypes = {
  row: PropTypes.object,
  onCloseModal: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PartsModal;

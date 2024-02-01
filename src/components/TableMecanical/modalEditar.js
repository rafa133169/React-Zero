// EditarDatosModal.js
import React, { useState, useEffect } from "react";
import './AgregarDatosModal.css';

function EditarDatosModal({ onClose, onEditarDatos, selectedRow }) {
  const [formData, setFormData] = useState({
    nombreCliente: "",
    modeloVehiculo: "",
    servicio: "",
    piezas: "",
    comentarios: "",
    valorPieza: "",
    tiempo: "",
    precioTotal: "",
    estatus: "",
  });

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        nombreCliente: selectedRow.nombreCliente,
        modeloVehiculo: selectedRow.modeloVehiculo,
        servicio: selectedRow.servicio,
        piezas: selectedRow.piezas,
        comentarios: selectedRow.comentarios,
        valorPieza: selectedRow.valorPieza,
        tiempo: selectedRow.tiempo,
        precioTotal: selectedRow.precioTotal,
        estatus: selectedRow.estatus,
      });
    }
  }, [selectedRow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    onEditarDatos(formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={handleCancel}>
          &times;
        </span>
        <form>
          <label>Nombre Cliente:</label>
          <input
            type="text"
            name="nombreCliente"
            value={formData.nombreCliente}
            onChange={handleInputChange}
          />
          <label>Modelo Vehiculo:</label>
          <input
            type="text"
            name="modeloVehiculo"
            value={formData.modeloVehiculo}
            onChange={handleInputChange}
          />
          <label>Servicio:</label>
          <input
            type="text"
            name="servicio"
            value={formData.servicio}
            onChange={handleInputChange}
          />
          <label>Piezas:</label>
          <input
            type="text"
            name="piezas"
            value={formData.piezas}
            onChange={handleInputChange}
          />
          <label>Comentarios:</label>
          <input
            type="text"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleInputChange}
          />


          <label>Estatus:</label>
          <input
            type="text"
            name="estatus"
            value={formData.estatus}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <button
              type="button"
              className="save-button"
              onClick={handleSaveChanges}
            >
              Guardar
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarDatosModal;

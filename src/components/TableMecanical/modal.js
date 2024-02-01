import React, { useState, useEffect } from 'react';
import './AgregarDatosModal.css';

function AgregarDatosModal({ onClose, onAgregarDatos }) {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    modeloVehiculo: '',
    servicio: '',
    piezas: '',
    comentarios: '',
  });

  const [tiempo, setTiempo] = useState(0);

  useEffect(() => {
    let timer;
    if (tiempo === 0) {
      timer = setInterval(() => {
        setTiempo((prevTiempo) => prevTiempo + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [tiempo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgregar = () => {
    const nuevosDatos = {
      ...formData,
      tiempo: tiempo,
    };

    onAgregarDatos(nuevosDatos);
    reiniciarCampos();
  };

  const reiniciarCampos = () => {
    setFormData({
      nombreCliente: '',
      modeloVehiculo: '',
      servicio: '',
      piezas: '',
      comentarios: '',
    });
    setTiempo(0);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Agregar Servicio</h2>
        <label>Nombre del Cliente:</label>
        <input
          type="text"
          name="nombreCliente"
          value={formData.nombreCliente}
          onChange={handleInputChange}
        />

        <label>Modelo del Vehículo:</label>
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

        <p>Tiempo transcurrido: {tiempo} segundos</p>
        <button onClick={handleAgregar}>Agregar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default AgregarDatosModal;

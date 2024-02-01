// AgregarDatosModal.js
import React, { useState } from 'react';
import './AgregarDatosModal.css';

function AgregarDatosModal({ onClose, onAgregarDatos }) {
  const [nombreCliente, setNombreCliente] = useState('');
  const [modeloVehiculo, setModeloVehiculo] = useState('');
  const [servicio, setServicio] = useState('');
  const [piezas, setPiezas] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [precioTotalPiezas, setPrecioTotalPiezas] = useState('');

  const handleAgregar = () => {
    // Implementa la lógica para agregar los datos a tu API
    const nuevosDatos = {
      nombreCliente,
      modeloVehiculo,
      servicio,
      piezas,
      comentarios,
      precioTotalPiezas,
    };

    // Llama a la función onAgregarDatos y pasa los nuevos datos
    onAgregarDatos(nuevosDatos);

    // Después de agregar los datos, cierra la ventana modal
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Agregar Servicio</h2>
        <input
          type="text"
          placeholder="Nombre del Cliente:"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modelo del Vehículo:"
          value={modeloVehiculo}
          onChange={(e) => setModeloVehiculo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Servicio:"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Piezas:"
          value={piezas}
          onChange={(e) => setPiezas(e.target.value)}
        />
        <input
          type="text"
          placeholder="Comentarios:"
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio Total de Piezas:"
          value={precioTotalPiezas}
          onChange={(e) => setPrecioTotalPiezas(e.target.value)}
        />
        <button onClick={handleAgregar}>Agregar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default AgregarDatosModal;

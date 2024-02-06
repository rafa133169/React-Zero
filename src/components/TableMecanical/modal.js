import React, { useState, useEffect } from 'react';
import './AgregarDatosModal.css';
import axios from 'axios';

function AgregarDatosModal({ onClose, onAgregarDatos }) {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    modeloVehiculo: '',
    servicios: [],
    piezas: [],
    comentarios: '',
    costoTotal: 0,
  });

  const [tiempo, setTiempo] = useState(0);
  const [servicios, setServicios] = useState([]);
  const [piezas, setPiezas] = useState([]);

  useEffect(() => {
    cargarServicios();
    cargarPiezas();
    calcularCostoTotal();
    // Restaurar tiempo a 0 al cargar el modal
    setTiempo(0);
  }, [formData.servicios, formData.piezas]);

  const cargarServicios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/servicios');
      setServicios(response.data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  const cargarPiezas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/piezas');
      setPiezas(response.data);
    } catch (error) {
      console.error('Error al obtener piezas:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      // Manejar la selección de servicios y piezas usando checkboxes
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.checked
          ? [...prevData[name], JSON.parse(value)] // Parsea el valor antes de agregarlo
          : prevData[name].filter((item) => JSON.stringify(item) !== value),
      }));
    } else {
      // Manejar otros campos
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAgregar = async () => {
    const nuevosDatos = {
      nombreCliente: formData.nombreCliente,
      modeloVehiculo: formData.modeloVehiculo,
      servicio_id: formData.servicios.map((servicio) => servicio.id),
      piezas_id: formData.piezas.map((pieza) => pieza.id),
      comentarios: formData.comentarios,
      costoTotal: formData.costoTotal,
      tiempo: tiempo,
      estatus: 'Pendiente',
    };
  
    console.log('Datos a enviar:', nuevosDatos);
  
    // Envia la solicitud para agregar datos
    try {
      const response = await axios.post('http://localhost:3001/api/registros_mecanicos', nuevosDatos);
  
      // Verifica la respuesta del servidor
      if (response.data.success) {
        // Ejecuta la función proporcionada para manejar la actualización local
        onAgregarDatos(nuevosDatos);
        // Reinicia los campos
        reiniciarCampos();
      } else {
        console.error('Error al agregar datos:', response.data.error);
      }
    } catch (error) {
      console.error('Error al agregar datos:', error.response?.data || error.message);
      // Muestra el error completo en la consola del cliente
      console.error('Error completo del servidor:', error.response?.data?.fullError || error.message);
    }
  };
  
  

  const reiniciarCampos = () => {
    setFormData({
      nombreCliente: '',
      modeloVehiculo: '',
      servicios: [],
      piezas: [],
      comentarios: '',
      costoTotal: 0,
    });
  };

  const calcularCostoTotal = () => {
    const costoServicios = formData.servicios.reduce((total, servicio) => total + servicio.precio, 0);
    const costoPiezas = formData.piezas.reduce((total, pieza) => total + pieza.costo, 0);

    const costoTotal = costoServicios + costoPiezas;

    setFormData((prevData) => ({
      ...prevData,
      costoTotal: costoTotal,
    }));
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

        <label>Servicios:</label>
        {servicios.map((servicio) => (
          <div key={servicio.id}>
            <input
              type="checkbox"
              name="servicios"
              value={JSON.stringify(servicio)}
              checked={formData.servicios.some((s) => s.id === servicio.id)}
              onChange={handleInputChange}
            />
            {servicio.servicio_nombre}
          </div>
        ))}

        <label>Piezas:</label>
        {piezas.map((pieza) => (
          <div key={pieza.id}>
            <input
              type="checkbox"
              name="piezas"
              value={JSON.stringify(pieza)}
              checked={formData.piezas.some((p) => p.id === pieza.id)}
              onChange={handleInputChange}
            />
            {pieza.nombre_pieza}
          </div>
        ))}

        <label>Comentarios:</label>
        <input
          type="text"
          name="comentarios"
          value={formData.comentarios}
          onChange={handleInputChange}
        />

        <p>Tiempo transcurrido: {tiempo} segundos</p>
        <p>Costo Total: {formData.costoTotal}</p>
        <button onClick={handleAgregar}>Agregar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default AgregarDatosModal;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AgregarDatosModal.css';

function EditarDatosModal({ onClose, onEditarDatos, selectedRow }) {
  const [formData, setFormData] = useState({
    nombreCliente: "",
    modeloVehiculo: "",
    servicioId: "",  
    piezaId: "",     
    comentarios: "",
    costoTotal: 0,
    estatus: "",
    tiempo: 0 // Agregar tiempo al estado inicial
  });

  const [servicios, setServicios] = useState([]);
  const [piezas, setPiezas] = useState([]);

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        nombreCliente: selectedRow.nombreCliente,
        modeloVehiculo: selectedRow.modeloVehiculo,
        servicioId: selectedRow.servicio_id || "", 
        piezaId: selectedRow.piezas_id || "",       
        comentarios: selectedRow.comentarios,
        costoTotal: selectedRow.costoTotal,
        estatus: selectedRow.estatus,
        tiempo: selectedRow.tiempo || 0 // Agregar tiempo del registro actual
      });
    }
  }, [selectedRow]);

  useEffect(() => {
    cargarServicios();
    cargarPiezas();
  }, []);

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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calcularCostoTotal = () => {
    const selectedServicio = servicios.find(servicio => servicio.id === parseInt(formData.servicioId));
    const selectedPieza = piezas.find(pieza => pieza.id === parseInt(formData.piezaId));
    const costoServicio = selectedServicio ? selectedServicio.precio : 0;
    const costoPieza = selectedPieza ? selectedPieza.costo : 0;
    const costoTiempo = formData.tiempo * 350; // Calcular el costo por tiempo
    const costoTotal = costoServicio + costoPieza + costoTiempo; // Sumar el costo por tiempo al costo total
    return costoTotal;
  };

  const handleSaveChanges = async () => {
    try {
      const costoTotal = calcularCostoTotal();

      await axios.put(`http://localhost:3001/api/registros_mecanicos/${selectedRow.id}`, {
        nombreCliente: formData.nombreCliente,
        modeloVehiculo: formData.modeloVehiculo,
        comentarios: formData.comentarios,
        costoTotal: costoTotal,
        estatus: formData.estatus,
        servicio_id: parseInt(formData.servicioId),
        piezas_id: parseInt(formData.piezaId),
        tiempo: formData.tiempo // Agregar tiempo
      });

      onClose();
      alert('Los cambios se guardaron correctamente.');
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
      alert('Se produjo un error al intentar guardar los cambios.');
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
          <select
            name="servicioId"
            value={formData.servicioId}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Servicio</option>
            {servicios.map(servicio => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.servicio_nombre}
              </option>
            ))}
          </select>
          <label>Pieza:</label>
          <select
            name="piezaId"
            value={formData.piezaId}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Pieza</option>
            {piezas.map(pieza => (
              <option key={pieza.id} value={pieza.id}>
                {pieza.nombre_pieza}
              </option>
            ))}
          </select>
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
          <label>Tiempo:</label>
          <input
            type="number"
            name="tiempo"
            value={formData.tiempo}
            onChange={handleInputChange}
          />
          <p>Costo Total: {calcularCostoTotal()}</p>
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import AgregarDatosModal from './modal';
import EditarDatosModal from './modalEditar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

function TableMecanical() {
  const [data, setData] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [timers, setTimers] = useState({}); // Almacena los temporizadores activos

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('Data actualizada:', data);
  }, [data]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/registros_mecanicos');
      setData(response.data || []);
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
      setData([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/registros_mecanicos/${id}`);
      clearTimer(id);
      setData((prevData) => prevData.filter((row) => row.id !== id));
      alert('Se borró correctamente');
    } catch (error) {
      console.error('Error al eliminar datos', error);
      alert('Sucedió un error');
    }
  };

  const handleOpenAgregarModal = () => {
    setShowAgregarModal(true);
  };

  const handleCloseAgregarModal = () => {
    setShowAgregarModal(false);
    fetchUsers();
  };

  const handleAgregarDatos = async (nuevosDatos) => {
    try {
      // Lógica de inserción en el modal
      // ...
    } catch (error) {
      console.error('Error al agregar datos', error);
    }
  }; 

  const handleOpenEditarModal = (row) => {
    setSelectedRow(row);
    setShowEditarModal(true);
  };

  const handleCloseEditarModal = () => {
    setSelectedRow(null);
    setShowEditarModal(false);
    fetchUsers();
  };

  const handleEditarDatos = async (datosEditados) => {
    try {
      await axios.put(`http://localhost:3001/api/registros_mecanicos/${selectedRow.id}`, datosEditados);

      setData((prevData) =>
        prevData.map((row) =>
          row.id === selectedRow.id ? { ...row, ...datosEditados } : row
        )
      );

      alert('Se editó correctamente');
      handleCloseEditarModal();
    } catch (error) {
      console.error('Error al editar datos', error);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
  };

  const handleStatusChange = async (id, isChecked) => {
    const newStatus = isChecked ? 'Terminado' : 'En proceso';

    try {
      await axios.put(`http://localhost:3001/api/registros_mecanicos/${id}`, { estatus: newStatus });

      setData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { ...row, estatus: newStatus } : row
        )
      );

      if (isChecked) {
        // Detener el temporizador si el estatus es "Terminado"
        clearTimer(id);
      } else {
        // Iniciar el temporizador si el estatus es "En proceso"
        startTimer(id);
      }
    } catch (error) {
      console.error('Error al cambiar el estatus', error);
    }
  };

  const startTimer = (id) => {
    if (!timers[id]) {
      // Iniciar un temporizador para la fila con el ID proporcionado
      const timerId = setInterval(() => {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === id ? { ...row, tiempo: (row.tiempo || 0) + 1 } : row
          )
        );
      }, 1000);

      setTimers((prevTimers) => ({
        ...prevTimers,
        [id]: timerId,
      }));
    }
  };

  const clearTimer = (id) => {
    // Detener y limpiar el temporizador asociado al ID proporcionado
    clearInterval(timers[id]);
    setTimers((prevTimers) => {
      const updatedTimers = { ...prevTimers };
      delete updatedTimers[id];
      return updatedTimers;
    });
  };

  return (
    <div>
      <NavBar onOpenAgregarModal={handleOpenAgregarModal} />
      {showAgregarModal && (
        <AgregarDatosModal onClose={handleCloseAgregarModal} onAgregarDatos={handleAgregarDatos} />
      )}
      {showEditarModal && (
        <EditarDatosModal
          onClose={handleCloseEditarModal}
          onEditarDatos={handleEditarDatos}
          selectedRow={selectedRow}  // Pasa los datos de la fila seleccionada al modal
        />
      )}

      <button className="add-button" onClick={handleOpenAgregarModal}>
        Agregar Servicio
      </button>
      <div className="flex justify-center">
        <table className="my-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Cliente</th>
              <th>Modelo Vehiculo</th>
              <th>Servicio</th>
              <th>Piezas</th>
              <th>Comentarios</th>
              <th>Tiempo</th>
              <th>Costo Total</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{row.nombreCliente}</td>
                <td>{row.modeloVehiculo}</td>
                <td>
                  {Array.isArray(row.servicios) && row.servicios.length > 0 ? (
                    row.servicios.map((servicio, index) => {
                      const servicioObj = typeof servicio === 'string' ? JSON.parse(servicio) : servicio;
                      return (
                        <div key={index}>
                          <p>{`Servicio ${index + 1}: ${servicioObj.servicio_nombre}`}</p>
                          <p>{`Descripción: ${servicioObj.descripcion}`}</p>
                          <p>{`Precio: ${servicioObj.precio}`}</p>
                        </div>
                      );
                    })
                  ) : (
                    "No disponible"
                  )}
                </td>

                <td>
                  {Array.isArray(row.piezas) && row.piezas.length > 0 ? (
                    row.piezas.map((pieza, index) => {
                      const piezaObj = typeof pieza === 'string' ? JSON.parse(pieza) : pieza;
                      return (
                        <div key={index}>
                          <p>{`Pieza ${index + 1}: ${piezaObj.nombre_pieza}`}</p>
                          <p>{`Cantidad: ${piezaObj.cantidad}`}</p>
                          <p>{`Costo: ${piezaObj.costo}`}</p>
                        </div>
                      );
                    })
                  ) : (
                    "No disponible"
                  )}
                </td>
                <td>{row.comentarios}</td>
                <td>{formatTime(row.tiempo)}</td>
                <td>{row.costoTotal}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.estatus === 'Terminado'}
                    onChange={(e) => handleStatusChange(row.id, e.target.checked)}
                  />
                  {row.estatus === 'En proceso' ? 'En proceso' : 'Terminado'}
                </td>
                <td>
                  <button className="icon-button" onClick={() => handleOpenEditarModal(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {"    "}
                  <button className="icon-button" onClick={() => handleDelete(row.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-button-row">
        <div className="add-button-cell"></div>
      </div>
    </div>
  );
}

export default TableMecanical;

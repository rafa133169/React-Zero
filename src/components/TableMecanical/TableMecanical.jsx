// Tablas.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './navbar';
import AgregarDatosModal from './modal';
import EditarDatosModal from './modalEditar';
import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function TableMecanical() {
  const [data, setData] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Taller');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
    }
  };

  const handleDelete = (id) => {
    try {
      // Filtra los datos para excluir el elemento con el ID dado
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
  };

    const handleAgregarDatos = (nuevosDatos) => {
      // Implementa la lógica para agregar los nuevos datos a tu API
      // Luego cierra la ventana modal
      // En este punto, puedes agregar nuevosDatos directamente a tu array de datos
      setData([...data, nuevosDatos]);
      handleCloseAgregarModal();
    };

  const handleOpenEditarModal = (row) => {
    setSelectedRow(row);
    setShowEditarModal(true);
  };

  const handleCloseEditarModal = () => {
    setSelectedRow(null);
    setShowEditarModal(false);
  };

  const handleEditarDatos = (datosEditados) => {
    try {
      // Actualiza los datos directamente en el estado local
      setData((prevData) =>
        prevData.map((row) =>
          row.id === selectedRow.id ? { ...row, ...datosEditados } : row
        )
      );

      alert('Se editó correctamente');

      // Cierra el modal de edición
      handleCloseEditarModal();
    } catch (error) {
      console.error('Error al editar datos', error);
    }
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
          selectedRow={selectedRow}
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
                <td>{row.servicio}</td>
                <td>{row.piezas}</td>
                <td>{row.comentarios}</td>
                <td>{row.tiempo}</td>
                <td>{row.costoTotal}</td>
                <td>{row.estatus}</td>
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

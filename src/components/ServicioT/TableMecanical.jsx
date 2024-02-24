import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';

import './stylesT.css';

function TableMecanicalT() {
  const [data, setData] = useState([]);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/registros_mecanicos');
      console.log('Respuesta de la API:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de la API', error);
      setData([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/registros_mecanicos/${id}`);
      setData(prevData => prevData.filter(row => row.id !== id)); // Remove deleted row
      alert('Se borró correctamente');
    } catch (error) {
      console.error('Error al eliminar datos', error);
      alert('Sucedió un error al intentar borrar los datos');
    }
  };

  const handleStatusChange = async (id, isChecked) => {
    const newStatus = isChecked ? 'Terminado' : 'En proceso';
    try {
      await axios.put(`http://localhost:3001/api/registros_mecanicos/${id}`, { ...data.find(row => row.id === id), estatus: newStatus });
      setData(prevData =>
        prevData.map(row =>
          row.id === id ? { ...row, estatus: newStatus } : row
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estatus', error);
    }
  };

  const handleOpenAgregarModal = () => {
    setShowAgregarModal(true);
  };

  const handleCloseAgregarModal = () => {
    setShowAgregarModal(false);
    fetchUsers(); // Refetch data after adding a new service
  };

  const handleAgregarDatos = async (nuevosDatos) => {
    try {
      fetchUsers(); // Refetch data after adding a new service
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
    fetchUsers(); // Refetch data after editing a service
  };

  const handleEditarDatos = async (datosEditados) => {
    try {
      await axios.put(`http://localhost:3001/api/registros_mecanicos/${selectedRow.id}`, datosEditados);
      setData(prevData =>
        prevData.map(row =>
          row.id === selectedRow.id ? { ...row, ...datosEditados } : row
        )
      );
      alert('Se editó correctamente');
      handleCloseEditarModal(); // Close modal after editing
    } catch (error) {
      console.error('Error al editar datos', error);
    }
  };

  return (
    <div>
      <Header onOpenAgregarModal={handleOpenAgregarModal} />
      <div style={{ textAlign: 'center' }}>
        <h1>Servicios concluidos</h1>
      </div>
      <div className="flex justify-center">
        <table className="my-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Cliente</th>
              <th>Modelo Vehiculo</th>
              <th>Servicio</th>
              <th>Piezas</th>
              <th>Horas de Tranajo</th>
              <th>Costo Total</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <th scope="row">{row.id}</th>
                <td>{row.nombreCliente}</td>
                <td>{row.modeloVehiculo}</td>
                <td>
                  {row.servicios && JSON.parse(row.servicios).map(servicio => (
                    <div key={servicio.id}>
                      {servicio.servicio_nombre}
                      <br />
                      {"costo: " + servicio.precio}
                    </div>
                  ))}
                </td>
                <td>
                  {row.piezas && JSON.parse(row.piezas).map(pieza => (
                    <div key={pieza.id}>
                      {pieza.nombre_pieza}
                      <br />
                      {"costo: " + pieza.costo}
                    </div>
                  ))}
                </td>
                <td>{row.tiempo}</td> {/* Display tiempo directly from the database */}
                <td>{row.costoTotal}</td>
                <td>
                  {row.estatus === 'En proceso' ? 'En proceso' : 'Terminado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableMecanicalT;

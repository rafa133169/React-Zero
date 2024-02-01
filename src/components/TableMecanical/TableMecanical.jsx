// Tablas.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './navbar' // Importa el componente NavBar
import AgregarDatosModal from './modal'; // Importa el componente AgregarDatosModal
import './styles.css'; // Importa el archivo CSS

function Tablas() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/Taller/${id}`);

      if (response.status === 200) {
        alert('Se borró correctamente');
      } else {
        alert('Sucedió un error');
      }

      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar datos de la API', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAgregarDatos = (nuevosDatos) => {
    // Implementa la lógica para agregar los nuevos datos a tu API
    // Luego cierra la ventana modal
    fetchUsers();
    handleCloseModal();
  };

  return (
    <div>
      <NavBar onOpenModal={handleOpenModal} />
      {showModal && (
      <AgregarDatosModal onClose={handleCloseModal} onAgregarDatos={handleAgregarDatos} />
      )}
      <div className="flex justify-center">
        <table className="my-table">
          <thead>
            <tr>
              <th colSpan="11" className="table-title-cell">
                Lista de Lotes
              </th>
            </tr>
            <tr className="add-button-row">
              <th colSpan="11" className="add-button-cell">
                <button className="add-button" onClick={handleOpenModal}>
                  Agregar Servicio
                </button>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Nombre Cliente</th>
              <th>Modelo Vehiculo</th>
              <th>Servicio</th>
              <th>Piezas</th>
              <th>Comentarios</th>
              <th>Valor Pieza</th>
              <th>Tiempo</th>
              <th>Precio Total</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Carlos R.</td>
              <td>Mazda</td>
              <td>Mantenimiento</td>
              <td>Bujías</td>
              <td>Cambiar bujías</td>
              <td>345$</td>
              <td>00:00:00</td>
              <td>345$</td>
              <td>En proceso</td>
              <td>
                <a className="edit-link">Editar</a>
                {"    "}
                <a className="delete-link" onClick={() => handleDelete(1)}>
                  Eliminar
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tablas;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Table.css';
import Modal from '../Modal/Modal';

const Table = () => {
  const [rows, setRows] = useState([
    { id: 1, nombre: '', correo: '', telefono: '' },
  ]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const handleUpdateClick = (row) => {
    setSelectedRow(row);
    setUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setUpdateModalVisible(false);
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      nombre: '',
      correo: '',
      telefono: '',
    };

    setRows([...rows, newRow]);
  };

  const handleInputChange = (row, field, value) => {
    const updatedRows = rows.map((r) => {
      if (r.id === row.id) {
        return { ...r, [field]: value };
      }
      return r;
    });
    setRows(updatedRows);
  };

  const handleDeleteClick = (row) => {
    const updatedRows = rows.filter((r) => r.id !== row.id);
    setRows(updatedRows);
  };

  const handleSaveClick = (id, newData) => {
    // Actualiza los datos en la tabla
    const updatedRows = rows.map((row) => (row.id === id ? { ...row, ...newData } : row));
    setRows(updatedRows);
  };

  return (
    <div>
      {/* Contenido de la tabla */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="text"
                  value={row.nombre}
                  onChange={(e) => handleInputChange(row, 'nombre', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.correo}
                  onChange={(e) => handleInputChange(row, 'correo', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.telefono}
                  onChange={(e) => handleInputChange(row, 'telefono', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleUpdateClick(row)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteClick(row)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón Agregar */}
      <button className="add-button" onClick={handleAddRow}>
        Agregar
      </button>

      {/* Modal de actualización */}
      {isUpdateModalVisible && (
        <Modal row={selectedRow} onCloseModal={handleModalClose} onSave={handleSaveClick} />
      )}
    </div>
  );
};

export default Table;

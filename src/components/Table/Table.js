import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Table.css';
import Modal from '../Modal/Modal';
import Header from '../Header/Header';
import Buttons from '../Buttons/Buttons';

const Table = () => {
  const [rows, setRows] = useState([]);
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
      edited: [true, true, true],
    };

    setRows([...rows, newRow]);
  };

  const handleInputChange = (row, field, value, index) => {
    const updatedRows = rows.map((r, i) => {
      if (r.id === row.id) {
        const newEdited = [...r.edited];
        newEdited[index] = true;
        return { ...r, [field]: value, edited: newEdited };
      }
      return r;
    });
    setRows(updatedRows);
  };

  const handleBlur = (row, index) => {
    const updatedRows = rows.map((r, i) => {
      if (r.id === row.id) {
        const newEdited = [...r.edited];
        newEdited[index] = false;
        return { ...r, edited: newEdited };
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
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, ...newData } : row
    );
    setRows(updatedRows);
    setUpdateModalVisible(false);
  };

  return (
    <div>
      <Header />
      <Buttons />
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
                  onChange={(e) => handleInputChange(row, 'nombre', e.target.value, 0)}
                  onBlur={() => handleBlur(row, 0)}
                  readOnly={!row.edited[0]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.correo}
                  onChange={(e) => handleInputChange(row, 'correo', e.target.value, 1)}
                  onBlur={() => handleBlur(row, 1)}
                  readOnly={!row.edited[1]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.telefono}
                  onChange={(e) => handleInputChange(row, 'telefono', e.target.value, 2)}
                  onBlur={() => handleBlur(row, 2)}
                  readOnly={!row.edited[2]}
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

      <button className="add-button" onClick={handleAddRow}>
        Agregar
      </button>

      {isUpdateModalVisible && (
        <Modal row={selectedRow} onCloseModal={handleModalClose} onSave={handleSaveClick} />
      )}
    </div>
  );
};

export default Table;

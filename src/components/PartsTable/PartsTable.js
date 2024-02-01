import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import PartsModal from '../PartsModal/PartsModal';
import './PartsTable.css';
import Buttons from '../Buttons/Buttons';
import Header from '../Header/Header';

const PartsTable = () => {
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const handleModalClose = () => {
    setSelectedPart(null);
    setUpdateModalVisible(false);
  };

  const handleAddPart = () => {
    const newPart = {
      id: parts.length + 1,
      partName: '',
      quantity: '',
      price: '',
      edited: [true, true, true],
    };

    setParts([...parts, newPart]);
  };

  const handleDeletePart = (part) => {
    const updatedParts = parts.filter((p) => p.id !== part.id);
    setParts(updatedParts);
  };

  const handleSavePart = (id, newData) => {
    const updatedParts = parts.map((part) =>
      part.id === id ? { ...part, ...newData } : part
    );
    setParts(updatedParts);
  };

  const handleInputChange = (part, field, value, index) => {
    const updatedParts = parts.map((p) => {
      if (p.id === part.id) {
        const newEdited = [...p.edited];
        newEdited[index] = true;
        return { ...p, [field]: value, edited: newEdited };
      }
      return p;
    });
    setParts(updatedParts);
  };

  const handleBlur = (part, index) => {
    const updatedParts = parts.map((p) => {
      if (p.id === part.id) {
        const newEdited = [...p.edited];
        newEdited[index] = false;
        return { ...p, edited: newEdited };
      }
      return p;
    });
    setParts(updatedParts);
  };

  const handleUpdateModal = (part) => {
    setSelectedPart(part);
    setUpdateModalVisible(true);
  };

  return (
    <div>
      <Header />
      <Buttons />
      <table className="parts-table">
        <thead>
          <tr>
            <th>Pieza</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td>
                <input
                  type="text"
                  value={part.partName}
                  onChange={(e) => handleInputChange(part, 'partName', e.target.value, 0)}
                  onBlur={() => handleBlur(part, 0)}
                  readOnly={!part.edited[0]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={part.quantity}
                  onChange={(e) => handleInputChange(part, 'quantity', e.target.value, 1)}
                  onBlur={() => handleBlur(part, 1)}
                  readOnly={!part.edited[1]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={part.price}
                  onChange={(e) => handleInputChange(part, 'price', e.target.value, 2)}
                  onBlur={() => handleBlur(part, 2)}
                  readOnly={!part.edited[2]}
                />
              </td>
              <td>
                <button onClick={() => handleUpdateModal(part)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeletePart(part)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón Agregar Pieza */}
      <button className="add-button" onClick={handleAddPart}>
        Agregar Pieza
      </button>

      {/* Modal de actualización de pieza */}
      {isUpdateModalVisible && (
        <PartsModal
          row={selectedPart}
          onCloseModal={handleModalClose}
          onSave={(formData) => {
            handleSavePart(selectedPart.id, formData);
            handleModalClose();
          }}
        />
      )}
    </div>
  );
};

export default PartsTable;

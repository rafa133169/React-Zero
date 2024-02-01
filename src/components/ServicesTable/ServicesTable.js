import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ServicesModal from '../ServicesModal/ServicesModal';
import './ServicesTable.css';
import Buttons from '../Buttons/Buttons';
import Header from '../Header/Header';

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const handleUpdateClick = (service) => {
    setSelectedService(service);
    setUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedService(null);
    setUpdateModalVisible(false);
  };

  const handleAddService = () => {
    const newService = {
      id: services.length + 1,
      serviceName: '',
      description: '',
      price: 0,
      edited: [true, true, true],
    };

    setServices([...services, newService]);
  };

  const handleDeleteService = (service) => {
    const updatedServices = services.filter((s) => s.id !== service.id);
    setServices(updatedServices);
  };

  const handleSaveService = (id, newData) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, ...newData } : service
    );
    setServices(updatedServices);
  };

  const handleInputChange = (service, field, value, index) => {
    const updatedServices = services.map((s) => {
      if (s.id === service.id) {
        const newEdited = [...s.edited];
        newEdited[index] = true;
        return { ...s, [field]: value, edited: newEdited };
      }
      return s;
    });
    setServices(updatedServices);
  };

  const handleBlur = (service, index) => {
    const updatedServices = services.map((s) => {
      if (s.id === service.id) {
        const newEdited = [...s.edited];
        newEdited[index] = false;
        return { ...s, edited: newEdited };
      }
      return s;
    });
    setServices(updatedServices);
  };

  return (
    <div>
      <Header />
      <Buttons />
      <table className="services-table">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>
                <input
                  type="text"
                  value={service.serviceName}
                  onChange={(e) => handleInputChange(service, 'serviceName', e.target.value, 0)}
                  onBlur={() => handleBlur(service, 0)}
                  readOnly={!service.edited[0]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={service.description}
                  onChange={(e) => handleInputChange(service, 'description', e.target.value, 1)}
                  onBlur={() => handleBlur(service, 1)}
                  readOnly={!service.edited[1]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) => handleInputChange(service, 'price', e.target.value, 2)}
                  onBlur={() => handleBlur(service, 2)}
                  readOnly={!service.edited[2]}
                />
              </td>
              <td>
                <button onClick={() => handleUpdateClick(service)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteService(service)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón Agregar Servicio */}
      <button className="add-button" onClick={handleAddService}>
        Agregar Servicio
      </button>

      {/* Modal de actualización de servicio */}
      {isUpdateModalVisible && (
        <ServicesModal
          service={selectedService}
          onCloseModal={handleModalClose}
          onSave={handleSaveService}
        />
      )}
    </div>
  );
};

export default ServicesTable;

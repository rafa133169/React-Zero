// ServicesTable.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ServicesModal from '../ServicesModal/ServicesModal'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto
import './ServicesTable.css';

const ServicesTable = () => {
  const [services, setServices] = useState([
    { id: 1, serviceName: '', description: '', price:'0'},
    // Agrega más servicios según sea necesario
  ]);

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
    };

    setServices([...services, newService]);
  };

  const handleDeleteService = (service) => {
    const updatedServices = services.filter((s) => s.id !== service.id);
    setServices(updatedServices);
  };

  const handleSaveService = (id, newData) => {
    // Actualiza los datos en la tabla
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, ...newData } : service
    );
    setServices(updatedServices);
  };

  return (
    <div>
      {/* Contenido de la tabla de servicios */}
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
                  onChange={(e) =>
                    handleSaveService(service.id, { serviceName: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={service.description}
                  onChange={(e) =>
                    handleSaveService(service.id, { description: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) =>
                    handleSaveService(service.id, { price: e.target.value })
                  }
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

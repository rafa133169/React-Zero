// ServicesTable.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./Editmodal.jsx";
import NewModal from "./NewServicesModal.jsx";
import "./ServicesTable.css";
import Buttons from "../Buttons/Buttons.js";
import Header from "../Header/Header.js";

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/servicios");
      const data = await response.json();
      const servicesWithEdited = data.map((service) => ({
        ...service,
        edited: [false, false, false],
      }));
      setServices(servicesWithEdited);
    } catch (error) {
      console.error("Error al obtener datos del servidor:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Ejecutar una vez al montar el componente

  const handleUpdateClick = (service) => {
    setSelectedService(service);
    setEditModalVisible(true);
  };

  const handleModalClose = () => {
    setEditModalVisible(false);
    setSelectedService(null); // Reinicia el servicio seleccionado
  };

  const handleAddService = () => {
    setSelectedService(null); // Reinicia el servicio seleccionado
    setNewModalVisible(true);
  };

  const handleDeleteService = async (service) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/servicios/${service.id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      console.log("Respuesta del servidor:", result);
      if (response.ok) {
        fetchData(); // Actualiza la tabla después de eliminar un servicio
      } else {
        console.error("Error al eliminar servicio:", result.error);
      }
    } catch (error) {
      console.error("Error al eliminar servicio:", error.message);
    }
  };

  const handleSaveService = async (service) => {
    try {
      let response;
  
      if (selectedService) {
        // Actualizar servicio existente
        response = await fetch(`http://localhost:3001/api/servicios/${service.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(service),
        });
      } else {
        // Agregar nuevo servicio
        response = await fetch('http://localhost:3001/api/servicios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(service),
        });
      }
  
      if (!response.ok) {
        throw new Error('Error al enviar datos al servidor');
      }
  
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
  
      // Actualiza el estado solo si la persistencia fue exitosa
      if (selectedService) {
        const updatedServices = services.map((s) =>
          s.id === service.id ? { ...service, edited: [false, false, false] } : s
        );
        setServices(updatedServices);
      } else {
        setServices([...services, { ...service, id: result.id, edited: [false, false, false] }]);
        setUpdateModalVisible(false);
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  

  const handleSaveNewService = async (newData) => {
    try {
      const response = await fetch('http://localhost:3001/api/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar datos al servidor');
      }
  
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
  
      // Actualiza el estado solo si la persistencia fue exitosa
      setServices([...services, { ...newData, id: result.id, edited: [false, false, false] }]);
      setNewModalVisible(false);
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
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
      const newEdited = [...s.edited];
      newEdited[index] = false;
      return { ...s, edited: newEdited };
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>
                <input
                  type="text"
                  value={service.servicio_nombre}
                  onChange={(e) =>
                    handleInputChange(
                      service,
                      "servicio_nombre",
                      e.target.value,
                      0
                    )
                  }
                  onBlur={() => handleBlur(service, 0)}
                  readOnly={!service.edited || !service.edited[0]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={service.descripcion}
                  onChange={(e) =>
                    handleInputChange(service, "descripcion", e.target.value, 1)
                  }
                  onBlur={() => handleBlur(service, 1)}
                  readOnly={!service.edited[1]}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={service.precio}
                  onChange={(e) =>
                    handleInputChange(service, "precio", e.target.value, 2)
                  }
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

      <button className="add-button" onClick={handleAddService}>
        <FontAwesomeIcon icon={faPlus} /> Agregar Servicio
      </button>

      {isNewModalVisible && (
        <NewModal
          onCloseModal={() => setNewModalVisible(false)}
          onSave={handleSaveNewService}
        />
      )}

      {isEditModalVisible && selectedService && (
        <EditModal
          service={selectedService}
          onCloseModal={handleModalClose}
          onSave={handleSaveService}
        />
      )}
    </div>
  );
};

export default ServicesTable;

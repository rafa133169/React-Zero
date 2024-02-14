// // Table.js
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
// import './Table.css';
// import Modal from './Modal.js';
// import NuevoModal from './NuevoModal.jsx';
// import Header from '../Header/Header.js';
// import Buttons from '../Buttons/Buttons.js';

// const Table = () => {
//   const [rows, setRows] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
//   const [isNewModalVisible, setNewModalVisible] = useState(false);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/api/registros');
//       const data = await response.json();

//       // Inicializa la propiedad 'edited' para cada fila
//       const rowsWithEdited = data.map((row, index) => ({ ...row, edited: [false, false, false], uniqueId: index }));
      
//       setRows(rowsWithEdited);
//     } catch (error) {
//       console.error('Error al obtener datos del servidor:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); // Ejecutar una vez al montar el componente

//   const handleUpdateClick = (row) => {
//     setSelectedRow(row);
//     setUpdateModalVisible(true);
//   };

//   const handleModalClose = () => {
//     setUpdateModalVisible(false);
//     fetchData(); // Actualiza la tabla después de cerrar el modal de actualización
//   };

//   const handleAddRow = () => {
//     setNewModalVisible(true);
//   };

//   const handleInputChange = (row, field, value, index) => {
//     const updatedRows = rows.map((r, i) => {
//       if (r.id === row.id) {
//         const newEdited = [...r.edited];
//         newEdited[index] = true;
//         return { ...r, [field]: value, edited: newEdited };
//       }
//       return r;
//     });
//     setRows(updatedRows);
//   };

//   const handleBlur = (row, index) => {
//     const updatedRows = rows.map((r) => {
//       const newEdited = [...r.edited];
//       newEdited[index] = false;
//       return { ...r, edited: newEdited };
//     });
//     setRows(updatedRows);
//   };

//   const handleDeleteClick = async (row) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/registros/${row.id}`, {
//         method: 'DELETE',
//       });
//       const result = await response.json();
//       console.log('Respuesta del servidor:', result);
//       if (response.ok) {
//         fetchData(); // Actualiza la tabla después de eliminar un registro
//       } else {
//         console.error('Error al eliminar registro:', result.error);
//       }
//     } catch (error) {
//       console.error('Error al eliminar registro:', error.message);
//     }
//   };

//   const handleSaveClick = async (id, newData) => {
//     // try {
//     //   const response = await fetch(`http://localhost:3001/api/registros/${id}`, {
//     //     method: 'PUT',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(newData),
//     //   });
//     //   const result = await response.json();
//     //   console.log('Respuesta del servidor:', result);
//     //   setUpdateModalVisible(false);
  
//     //   // Actualiza la tabla solo después de guardar cambios exitosamente
//     //   if (response.ok && result.success) {
//     //     fetchData();
//     //   } else {
//     //     console.error('Error al enviar datos al servidor:', result.error);
//     //   }
//     // } catch (error) {
//     //   console.error('Error al enviar datos al servidor:', error);
//     // }
//   };
  
//   const handleSaveNewRow = async (newData) => {
//     try {
//       const response = await fetch('http://localhost:3001/api/registros', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newData),
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         console.log('Respuesta del servidor:', result);
  
//         // Actualiza el estado solo si la persistencia fue exitosa
//         setRows((prevRows) => [...prevRows, { ...newData, id: result.id, edited: [false, false, false] }]);
//         setNewModalVisible(false);
//       } else {
//         console.error('Error al enviar datos al servidor:', response);
//       }
//     } catch (error) {
//       console.error('Error al enviar datos al servidor:', error);
//     }
//   };
  
  
//   return (
//     <div>
//       <Header />
//       <Buttons />
//       <table>
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Correo</th>
//             <th>Teléfono</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id}>
//               <td>
//                 <input
//                   type="text"
//                   value={row.nombre}
//                   onChange={(e) => handleInputChange(row, 'nombre', e.target.value, 0)}
//                   onBlur={() => handleBlur(row, 0)}
//                   readOnly={!row.edited || !row.edited[0]}
//                   />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.correo}
//                   onChange={(e) => handleInputChange(row, 'correo', e.target.value, 1)}
//                   onBlur={() => handleBlur(row, 1)}
//                   readOnly={!row.edited[1]}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.telefono}
//                   onChange={(e) => handleInputChange(row, 'telefono', e.target.value, 2)}
//                   onBlur={() => handleBlur(row, 2)}
//                   readOnly={!row.edited[2]}
//                 />
//               </td>
//               <td>
//                 <button onClick={() => handleUpdateClick(row)}>
//                   <FontAwesomeIcon icon={faEdit} />
//                 </button>
//                 <button onClick={() => handleDeleteClick(row)}>
//                   <FontAwesomeIcon icon={faTrash} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button className="add-button" onClick={handleAddRow}>
//       <FontAwesomeIcon icon={faPlus} /> Agregar
//       </button>

//       {isNewModalVisible && (
//         <NuevoModal onCloseModal={() => setNewModalVisible(false)} onSave={handleSaveNewRow} />
//       )}

//       {isUpdateModalVisible && (
//         <Modal row={selectedRow} onCloseModal={handleModalClose} onSave={handleSaveClick} />
//       )}
//     </div>
//   );
// };

// export default Table;

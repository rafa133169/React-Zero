import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'administrador',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.use(express.json());

// Ruta para obtener todos los registros de la tabla 'registros'
app.get('/api/registros', (req, res) => {
  const sql = 'SELECT * FROM registros';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(result);
    }
  });
});

// Ruta para guardar un nuevo registro en la tabla 'registros'
app.post('/api/registros', (req, res) => {
  const { nombre, correo, telefono } = req.body;

  const sql = 'INSERT INTO registros (nombre, correo, telefono) VALUES (?, ?, ?)';
  db.query(sql, [nombre, correo, telefono], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Registro insertado correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para actualizar un registro por ID
app.put('/api/registros/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, correo, telefono } = req.body;

  const sql = 'UPDATE registros SET nombre=?, correo=?, telefono=? WHERE id=?';
  db.query(sql, [nombre, correo, telefono, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Registro actualizado correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para eliminar un registro por ID
app.delete('/api/registros/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM registros WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Registro eliminado correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para obtener todos los registros de la tabla 'servicios'
app.get('/api/servicios', (req, res) => {
  const sql = 'SELECT * FROM servicios';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener servicios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(result);
    }
  });
});

// Ruta para guardar un nuevo servicio en la tabla 'servicios'
app.post('/api/servicios', (req, res) => {
  const { servicio_nombre, descripcion, precio, tiempo } = req.body; // Agregar tiempo desde la solicitud

  const sql = 'INSERT INTO servicios (servicio_nombre, descripcion, precio, tiempo) VALUES (?, ?, ?, ?)'; // Actualizar la query SQL
  db.query(sql, [servicio_nombre, descripcion, precio, tiempo], (err, result) => {
    if (err) {
      console.error('Error al insertar servicio en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Servicio insertado correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para actualizar un servicio por ID
app.put('/api/servicios/:id', (req, res) => {
  const id = req.params.id;
  const { servicio_nombre, descripcion, precio, tiempo } = req.body; // Agregamos tiempo

  const sql = 'UPDATE servicios SET servicio_nombre=?, descripcion=?, precio=?, tiempo=? WHERE id=?'; // Modificamos la consulta para incluir tiempo
  db.query(sql, [servicio_nombre, descripcion, precio, tiempo, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el servicio:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Servicio actualizado correctamente');
      res.json({ success: true });
    }
  });
});


// Ruta para eliminar un servicio por ID
app.delete('/api/servicios/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM servicios WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el servicio:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Servicio eliminado correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para obtener todas las piezas de la tabla 'piezas'
app.get('/api/piezas', (req, res) => {
  const sql = 'SELECT * FROM piezas';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener piezas:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(result);
    }
  });
});

// Ruta para guardar una nueva pieza en la tabla 'piezas'
app.post('/api/piezas', (req, res) => {
  const { nombre_pieza, cantidad, costo } = req.body;

  const sql = 'INSERT INTO piezas (nombre_pieza, cantidad, costo) VALUES (?, ?, ?)';
  db.query(sql, [nombre_pieza, cantidad, costo], (err, result) => {
    if (err) {
      console.error('Error al insertar pieza en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Pieza insertada correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para actualizar una pieza por ID
app.put('/api/piezas/:id', (req, res) => {
  const id = req.params.id;
  const { nombre_pieza, cantidad, costo } = req.body;

  const sql = 'UPDATE piezas SET nombre_pieza=?, cantidad=?, costo=? WHERE id=?';
  db.query(sql, [nombre_pieza, cantidad, costo, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar la pieza:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Pieza actualizada correctamente');
      res.json({ success: true });
    }
  });
});

// Ruta para eliminar una pieza por ID
app.delete('/api/piezas/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM piezas WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la pieza:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Pieza eliminada correctamente');
      res.json({ success: true });
    }
  });
});

app.post('/api/registros_mecanicos', async (req, res) => {
  const {
    nombreCliente,
    modeloVehiculo,
    servicio_id,
    piezas_id,
    comentarios,
    costoTotal,
    estatus,
  } = req.body;

  // Asegúrate de tener el tiempo en tu nuevo registro, podrías ajustar esta lógica según tus necesidades
  const tiempo = req.body.tiempo || 0;

  const sql =
    'INSERT INTO registros_mecanicos (nombreCliente, modeloVehiculo, comentarios, tiempo, costoTotal, estatus, servicio_id, piezas_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    await new Promise((resolve, reject) => {
      db.query(
        sql,
        [nombreCliente, modeloVehiculo, comentarios, tiempo, costoTotal, estatus, servicio_id, piezas_id],
        (err, result) => {
          if (err) {
            console.error('Error al insertar en la base de datos:', err);
            reject(err);
          } else {
            console.log('Registro insertado correctamente');
            resolve(result);
          }
        }
      );
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', fullError: error.message });
  }
});




app.get('/api/registros_mecanicos', (req, res) => {
  const sql = `
    SELECT
      registros_mecanicos.*,
      CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', servicios.id, 'servicio_nombre', servicios.servicio_nombre, 'descripcion', servicios.descripcion, 'precio', servicios.precio)), ']') as servicios,
      CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', piezas.id, 'nombre_pieza', piezas.nombre_pieza, 'cantidad', piezas.cantidad, 'costo', piezas.costo)), ']') as piezas
    FROM registros_mecanicos
    LEFT JOIN servicios ON registros_mecanicos.servicio_id = servicios.id
    LEFT JOIN piezas ON registros_mecanicos.piezas_id = piezas.id
    GROUP BY registros_mecanicos.id;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener registros mecánicos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(result);
    }
  });
});

app.put('/api/registros_mecanicos/:id', (req, res) => {
  const registroId = req.params.id;
  const nuevosDatos = req.body;

  const sql = `
    UPDATE registros_mecanicos
    SET 
      nombreCliente = ?,
      modeloVehiculo = ?,
      servicio_id = ?,
      piezas_id = ?,
      comentarios = ?,
      tiempo = ?,
      costoTotal = ?,
      estatus = ?
    WHERE id = ?;
  `;

  const values = [
    nuevosDatos.nombreCliente,
    nuevosDatos.modeloVehiculo,
    nuevosDatos.servicio_id,
    nuevosDatos.piezas_id,
    nuevosDatos.comentarios,
    nuevosDatos.tiempo,
    nuevosDatos.costoTotal,
    nuevosDatos.estatus,
    registroId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Registro actualizado correctamente' });
    }
  });
});


app.delete('/api/registros_mecanicos/:id', (req, res) => {
  const registroId = req.params.id;

  const sql = 'DELETE FROM registros_mecanicos WHERE id = ?';

  db.query(sql, [registroId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json({ message: 'Registro eliminado correctamente' });
    }
  });
});


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

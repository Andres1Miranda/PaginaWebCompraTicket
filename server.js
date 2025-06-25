// server.js
const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc 
} = require('firebase/firestore');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir archivos HTML estáticos

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// RUTAS DE LA API

// GET - Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    const snapshot = await getDocs(usuariosRef);
    const usuarios = [];
    
    snapshot.forEach((doc) => {
      usuarios.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json({
      success: true,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Obtener un usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      res.json({
        success: true,
        data: {
          id: docSnap.id,
          ...docSnap.data()
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST - Crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;
    
    // Validación básica
    if (!nombre || !email) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y email son requeridos'
      });
    }
    
    const nuevoUsuario = {
      nombre,
      email,
      edad: edad || null,
      fechaCreacion: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'usuarios'), nuevoUsuario);
    
    res.status(201).json({
      success: true,
      data: {
        id: docRef.id,
        ...nuevoUsuario
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT - Actualizar un usuario
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, edad } = req.body;
    
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    
    const datosActualizados = {
      ...(nombre && { nombre }),
      ...(email && { email }),
      ...(edad !== undefined && { edad }),
      fechaActualizacion: new Date().toISOString()
    };
    
    await updateDoc(docRef, datosActualizados);
    
    res.json({
      success: true,
      data: {
        id,
        ...docSnap.data(),
        ...datosActualizados
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE - Eliminar un usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(db, 'usuarios', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    
    await deleteDoc(docRef);
    
    res.json({
      success: true,
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});
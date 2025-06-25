// firebase-config.js
// Este archivo contiene la configuración de Firebase
// Reemplaza estos valores con los de tu proyecto Firebase

const firebaseConfig = {
  // Obtén estos valores desde la consola de Firebase
  // https://console.firebase.google.com/ -> Configuración del proyecto -> General
  
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz", // Tu API Key
  authDomain: "tu-proyecto.firebaseapp.com", // Tu Auth Domain
  projectId: "tu-proyecto-id", // Tu Project ID
  storageBucket: "tu-proyecto.appspot.com", // Tu Storage Bucket
  messagingSenderId: "123456789012", // Tu Messaging Sender ID
  appId: "1:123456789012:web:abcdef1234567890abcdef" // Tu App ID
};

module.exports = firebaseConfig;

/* 
PASOS PARA CONFIGURAR FIREBASE:

1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "Configuración del proyecto" (ícono de engranaje)
4. En la pestaña "General", baja hasta "Tus aplicaciones"
5. Haz clic en "Agregar aplicación" y selecciona "Web" (</>)
6. Registra tu aplicación con un nombre
7. Copia la configuración que te proporciona Firebase
8. Reemplaza los valores en firebaseConfig arriba

9. Habilitar Firestore:
   - Ve a "Firestore Database" en el menú lateral
   - Haz clic en "Crear base de datos"
   - Selecciona "Comenzar en modo de prueba" (para desarrollo)
   - Elige una ubicación para tu base de datos

10. Configurar reglas de seguridad (para desarrollo):
    - En Firestore, ve a "Rules"
    - Cambia las reglas a:
    
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if true;
        }
      }
    }
    
    NOTA: Estas reglas son solo para desarrollo. 
    Para producción, implementa reglas de seguridad apropiadas.
*/
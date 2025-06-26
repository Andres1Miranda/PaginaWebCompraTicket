// firebase-config.js
// Este archivo contiene la configuración de Firebase
// Reemplaza estos valores con los de tu proyecto Firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  // Obtén estos valores desde la consola de Firebase
  // https://console.firebase.google.com/ -> Configuración del proyecto -> General
  
  apiKey: "AIzaSyAtucAmdV_7UO84OHeK2jKSyW0VqXohUFA", // Tu API Key
  authDomain: "databaseweb-c3716.firebaseapp.com", // Tu Auth Domain
  projectId: "databaseweb-c3716", // Tu Project ID
  storageBucket: "databaseweb-c3716.firebasestorage.app", // Tu Storage Bucket
  messagingSenderId: "822232922799", // Tu Messaging Sender ID
  appId: "1:822232922799:web:67f5ce0f8a332bbe25325a"// Tu App ID
};

const app=initializeApp(firebaseConfig);
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
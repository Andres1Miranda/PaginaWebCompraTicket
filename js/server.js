const express = require('express');
const cors = require('cors');
const {initializeApp}=require('firebase/app');
const {getFirestore, collection, addDoc, getDocs, doc, getDoc}=require('firebase/firestore');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const firebaseConfig = {
    apiKey:"AIzaSyDOKmxvF5lERrZPfxvHGyFMJmVv3Ai0QDc",
    authDomain:"api-boletos-compra.firebaseapp.com",
    projectId:"api-boletos-compra",
    storeBucket:"api-boletos-compra.firebasestorage.app",
    messagingSenderId:"276481779135",
    appId:"1:276481779135:web:b1d441037e8fe0298ded0a"
};
const firebaseApp=initializeApp(firebaseConfig);
const db=getFirestore(firebaseApp);

app.post('/api/boletos',async(req,res)=>{
    try{
        const {
            cedula,
            nombreCliente, email, telefono,
            concierto, cantidadBoletos,
            precio, fechaCompra
        }=req.body;
        const nuevaCompra={
            cedula,
            nombreCliente, email, telefono,
            concierto, cantidadBoletos: parseInt(cantidadBoletos),
            precio:parseFloat(precio),
            fechaCompra:fechaCompra || new Date().toISOString(),
            estado:'confirmado'
        };

        const docRef = await addDoc(collection(db,'compras'),nuevaCompra);
        res.status(201).json({
            success:true,
            message:'Compra registrada exitosamente',
            id: docRef.id,
            data:nuevaCompra
        });
    }catch(error){
        console.error('Error al agregar compra:',error);
        res.status().json({
            success:false,
            message:false,
            message:'Error al registrar la compra',
            error:error.message
        });
    }

    app.listen(PORT,()=>{
        console.log('API correndo correctamente http://localhost:${PORT}');
    });

    module.exports=app;
});
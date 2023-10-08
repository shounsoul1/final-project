import express from 'express'
import router from './routes/routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.DB_URL;
mongoose.connect(mongoURI)
const db = mongoose.connection

db.on('error',(error)=>{
    console.log(error)
})

db.once('connected',()=>{
    console.log('Conexion con la base de datos exitosa 🎉')
})

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api', router)

app.listen(process.env.PORT)
console.log(`Server running on http://localhost:${process.env.PORT}/api/tft `)

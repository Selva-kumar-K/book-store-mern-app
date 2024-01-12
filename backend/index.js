import express from 'express'
import {PORT, MONGO_URI} from './config.js'
import cors from 'cors'
import mongoose from 'mongoose'
import {Book} from "./models/bookModel.js"
import route from './routes/booksRoute.js'
const app = express()

app.use(express.json())
app.use(cors())

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type'],
// }))

app.use('/books', route)

app.get('/', (req,res) => {
    res.status(234).send('Welcome to mern stack tutorial')
})

mongoose.connect(MONGO_URI)

.then(() => {
    console.log('Application Connected to the Database')
    app.listen(PORT, () => {
        console.log(`Server is listening on the port no : ${PORT}`)
    })
})

.catch((error) => {
    console.log(error)
})
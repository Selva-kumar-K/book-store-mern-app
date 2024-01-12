import express from "express"
import { Book } from "../models/bookModel.js"

const route = express.Router()

route.get('/', async(req,res) => {
    try {
        const all_books = await Book.find({})
        return res.status(200).json({
            count : all_books.length,
            data: all_books
            
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({error : error.message})
    }

})

route.get('/:id', async(req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({error : error.message})
    }

})

route.put('/:id', async(req,res) => {

    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'All fields are required'
            })
        }

        const {id} = req.params

        const update_book = await Book.findByIdAndUpdate(id, req.body)
        if (!update_book){
            return res.status(400).json({message: 'Book not found'})
        }

        return res.status(200).json({message: 'Book updated successfully!'})
    } catch (error) {
        console.log(error.mesage)
        return res.status(500).send({error : error.mesage})
    }

})

route.post('/', async(req,res) => {
    try {

    if (!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({
            message: 'All fields are required'
        })
    }

    const newBook = {
        title : req.body.title,
        author : req.body.author,
        publishYear : req.body.publishYear
    }

    const book = await Book.create(newBook)
    return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.mesage)
        res.status(500).send({error : error.mesage})
    }
})

route.delete('/:id', async(req,res) => {

    try {
        
        const {id} = req.params

        const deleteBook = await Book.findByIdAndDelete(id)
        if (!deleteBook){
            return res.status(400).json({message: 'Book not found'})
        }

        return res.status(200).json({message: 'Book Deleted successfully!'})
    } catch (error) {
        console.log(error.mesage)
        return res.status(500).send({error : error.mesage})
    }

})

export default route
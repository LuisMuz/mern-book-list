import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send("Please provide all required fields");
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Could not create book");
    }
});

router.put("/:id", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send("Please provide all required fields");
        }

        const {id} = req.params;

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(result){
            return res.status(200).send("Book updated successfully");
        }else{
            return res.status(404).send(`Book with id ${id} not found`);
        }
    }catch(error){
        console.log(error.message);
        res.status(500).send("Could not create book");
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const{id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send(`Book with id ${id} not found`);
        }
        return res.status(200).send("Book deleted succcessfuly")
    }catch(error){
        console.log(error.message);
        res.status(500).send("Could not delete book");
    }
});

router.get('/:id', async (req, res) => {
    try{
        const{id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send(`Could not get book with id ${id}`);
    }
});

router.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send("Could not get book");
    }
});

export default router;
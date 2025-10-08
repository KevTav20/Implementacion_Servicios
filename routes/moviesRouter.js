const express = require('express')
const { database } = require('faker/lib/locales/en')
const router = express.Router()

let movies = [
    {id:1, title: 'Tron', year: 2010, category: 'Sci-Fi'},
    {id:2, title: 'El renacido', year: 2018, category: 'Suspenso'},
    {id:3, title: 'Shrek 2', year: 2003, category: 'Animada'}
]
// Obtener todo
router.get('/', (req, res) => {
    res.json(movies)
})

router.get('/:id', (req, res) => {
    const {id} = req.params
    const movie = movie.find(m => m.id == id)
    if(movie){
        res.json(movie)
    }else{
        res.status(404).json({message: "Movie Not Found"})
    }
})

router.post('/', (req, res) => {
    const {title, year, category} = req.body
    const newMovie ={
        title,
        year,
        category
    }
    movies.push(newMovie)
    res.status(201).json({
        message: "created",
        data: newMovie
    })
})

router.patch('/:id', (req, res) => {
    const {id} = req.params
    const movie = movie.find(m => m.id == id)

    if (!movie) {
        return res.status(404).json({ message: "Movie Not Found" })
    }

    const { title, year, category } = req.body
    if (title !== undefined) movie.title = title
    if (year !== undefined) movie.year = year
    if (category !== undefined) movie.category = category

    res.json(movie)
})

router.delete('/:id', (req,res) => {
    const {id} = req.params
    const movieIndex = movie.findIndex(m => m.id == id)
    if(movieIndex !== -1){
        movie.splice(movieIndex, 1)
        res.json({
            message: 'deleted',
            id
        })
    }else{
        res.status(404).json({message: "Movie Not Found"})
    }
})

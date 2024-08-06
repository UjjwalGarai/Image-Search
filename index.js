
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { createClient } from 'pexels';

const client = createClient('yUZuA3PaOAXM04sqidO54maXbxw6nTzFwNBB5nyyejud0UgNOQ3E1pfi');

const port = 3000






const app = express()
// app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render('index.ejs')
})

app.post("/submit", async (req, res) => {
    try {
        
        const query = req.body.search;
        console.log(query)
        // const result = query
    
        // const query = 'Nature';
        const photos = await client.photos.search({ query, per_page: 1 })
        const result = photos.photos[0].src.medium
        res.render('index.ejs', { result })
    } catch (error) {
        const result = error.message
        res.render('index.ejs', { result })
    }
})


app.listen(port, (req, res) => {
    console.log(`Your server is running on port ${port}`)
})
// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
let id = 1;

server.use(express.json());

server.post("/posts", (req, res) => {
    const { author, title, contents} = req.body;
    if (!author || !title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para crear el Post"
            })
    }

    const newPost = {id: id++, author, title, contents};
    posts.push(newPost);
    res.status(200).json(newPost);
});

server.post("/posts/author/:author", (req, res) => {
    const {title, contents} = req.body;
    const {author} = req.params;

    if (!author || !title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parámetros necesarios para crear el Post"
            })
    }

    const newPost = {id: id++, author, title, contents};
    posts.push(newPost);
    res.status(200).json(newPost);
});

server.get("/posts", (req, res) => {
    const {term} = req.query;

    if (term) { 
        const postFiltered = posts.filter( post => post.title.includes(term) || post.contents.includes(term));
        return res.status(200).json(postFiltered);
    }
    else { 
        return res.status(200).json(posts);
    }
});

server.get("/posts/:author", (req, res) => {
    const {author} = req.params;
    const postFiltered = posts.filter(post => post.author === author);

    if (postFiltered.length) {
        res.status(200).json(postFiltered);
    }
    else {
        res
          .status(STATUS_USER_ERROR)
          .json({error: "No existe ningun post del autor indicado"});
    };
});

server.get("/posts/:author/:title", (req, res) => {
    const {author, title} = req.params;
    
    postFiltered = posts.filter( post => post.author === author && post.title === title);
    if (postFiltered.length) {
        res.status(200).json(postFiltered);
    }
    else {
        res
          .status(STATUS_USER_ERROR)
          .json({error: "No existe ningun post con dicho titulo y autor indicado"});
    }
});

server.put("/posts", (req, res) => {
    const {id, title, contents} = req.body;

    if (!id || !title || !contents) {
        return res
          .status(STATUS_USER_ERROR)
          .json({error: "No se recibieron los parámetros necesarios para modificar el Post"});  
    };

    const postFind = posts.find(post => post.id === parseInt(id));
    if (postFind) {
        postFind.title = title;
        postFind.contents = contents;
        res.status(200).json(postFind);
    }
    else {
        res
          .status(STATUS_USER_ERROR)
          .json({error: "El id buscado para modificar el Post no existe"});  
    }
});

server.delete("/posts", (req, res) => {
    const {id} = req.body;
    const postFind = posts.find(post => post.id === parseInt(id));

    if (!id || !postFind) 
       return res
            .status(STATUS_USER_ERROR)
            .json({error: "Mensaje de error"});

    posts = posts.filter(post => post.id !== id);
    res.status(200).json({ success: true });
});


server.delete("/author", (req, res) => {
    const {author} = req.body;
    const postAuthors = posts.filter(post => post.author === author);

    if (!author || !postAuthors.length) 
       return res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe el autor indicado"});

    posts = posts.filter(post => post.author !== author);
    res.status(200).json(postAuthors);
})


module.exports = { posts, server };

// to enable parsing of json bodies for post requests
// server.use(express.json());

// TODO: your code to handle requests

// tres formas de enviar info
// 1 - body
// 2 - params -> url -> /users/:id
// 3 - query -> url -> users?name=Pedro


// son rutas distintas
// /users
// /users/1

// son rutas iguales
// /users
// /users?name=pedro



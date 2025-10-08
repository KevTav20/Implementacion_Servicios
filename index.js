const express = require('express');
const routerApi = require('./routes/rutas');
const app = express();
const port = 3000;
app.use(express.json());

routerApi(app)

app.get("/", (req, res) => {
    res.send("Hola desde mi server en Epress");
});

app.get("/nuevaruta", (req, res) => {
    res.send("Hola desde una nueva ruta")
})

// app.get("/products", (req, res)=> {
//     res.json([{
//         name: 'Coca Cola',
//         price: 50
//     },
//     {
//         name: 'Pepsi',
//         price: 40
//     }]);
// });

// //parametro tipo ruta
// app.get("/category/:categoryId/products/productsId", (req, res) => {
//     const {categoryId, productsId} = req.params
//     res.json({
//         categoryId,
//         productsId
//     })
// })

app.get("/users", (req, res) =>{
    const {username, lastname} = req.query
    if(username && lastname){
        res.json({
            username,
            lastname
        });
    }else{
        res.send("No hay parametros query")
    }
})
app.listen(port, ()=> {
    console.log("My server is working on: " + port)
})

/*
api.example.com/tasks/{id}/
api.example.com/peaople/{id}/
api.example.com/users/{id}/tasks/{id}
*/



const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker"); // Faker moderno
const productsService = require("../services/productsService")
const service = new productsService()

// // Generar productos
// function generateProducts(limit = 20) {
//     const products = [];
//     for (let index = 0; index < limit; index++) {
//         products.push({
//             id: index + 1,
//             productName: faker.commerce.productName(),
//             description: faker.commerce.productDescription(),
//             price: parseFloat(faker.commerce.price()),
//             image: faker.image.url(),
//             categoryId: faker.number.int({ min: 1, max: 5 }),
//             brandId: faker.number.int({ min: 1, max: 5 }),
//         });
//     }
//     return products;
// }

// Dataset global
let products = generateProducts(20);

// GET todos los productos
router.get("/", (req, res) => {
    const products = service.getAll()
    res.json(products)
});

// GET producto por ID
router.get("/:id", (req, res) => {
    const { id } = req.params
    const product = service.getById(id)
    res.json(product)
});


// GET productos por categoría
router.get("/categories/:categoryId", (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    const filtered = products.filter((p) => p.categoryId === categoryId);

    if (filtered.length === 0) {
        return res.status(404).json({ message: "No hay productos en esta categoría" });
    }

    res.json(filtered);
});

// GET productos por marca
router.get("/brands/:brandId", (req, res) => {
    const brandId = parseInt(req.params.brandId);
    const filtered = products.filter((p) => p.brandId === brandId);

    if (filtered.length === 0) {
        return res.status(404).json({ message: "No hay productos en esta marca" });
    }

    res.json(filtered);
});



// // POST crear producto
// router.post("/", (req, res) => {
//     try {
//         const newProduct = service.create(req.body);
//         res.status(201).json({ message: "Producto creado", data: newProduct });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// POST crear producto version Profe
router.post("/", (req, res) => {
    const body = req.body
    const newProduct = service.create(body)
    res.status(201).json(newProduct)
});

// PUT actualizar producto completo
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    const { productName, description, price, image, categoryId, brandId } = req.body;

    if (!productName || !description || !price || !categoryId || !brandId) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    products[index] = {
        id,
        productName,
        description,
        price,
        image: image || faker.image.url(),
        categoryId,
        brandId,
    };

    res.json({ message: "Producto actualizado", data: products[index] });
});

// PATCH actualizar parcialmente
// router.patch("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const product = products.find((p) => p.id === id);

//     if (!product) {
//         return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     const { productName, description, price, image, categoryId, brandId } = req.body;

//     if (productName !== undefined) product.productName = productName;
//     if (description !== undefined) product.description = description;
//     if (price !== undefined) product.price = price;
//     if (image !== undefined) product.image = image;
//     if (categoryId !== undefined) product.categoryId = categoryId;
//     if (brandId !== undefined) product.brandId = brandId;

//     res.json({ message: "Producto modificado", data: product });
// });

router.patch("/:id", (req, res) => {
    const { id } = req.params
    const body = req.body
    const product = service.update(id, body)
    res.json(product)
});

// // DELETE eliminar producto
// router.delete("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = products.findIndex((p) => p.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     const deleted = products.splice(index, 1);

//     res.json({ message: "Producto eliminado", data: deleted[0] });
// });

// DELETE eliminar producto
router.delete("/:id", (req, res) => {
    const { id } = req.params
    const respuesta = service.delete(id)
    res.json(respuesta)
});


module.exports = router;

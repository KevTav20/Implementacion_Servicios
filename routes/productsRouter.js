const express = require("express");

module.exports = function (productsService) {
    const router = express.Router();

    /**
     * @swagger
     * tags:
     *   name: Products
     *   description: Endpoints para la gestión de productos
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Product:
     *       type: object
     *       properties:
     *         _id:
     *           type: string
     *           example: "507f1f77bcf86cd799439011"
     *         productName:
     *           type: string
     *           example: "Laptop Dell XPS 15"
     *         description:
     *           type: string
     *           example: "Laptop de alto rendimiento con pantalla 4K"
     *         price:
     *           type: number
     *           example: 1299.99
     *         image:
     *           type: string
     *           example: "https://example.com/image.jpg"
     *         stock:
     *           type: integer
     *           example: 50
     *         categoryId:
     *           type: string
     *           example: "507f1f77bcf86cd799439012"
     *         brandId:
     *           type: string
     *           example: "507f1f77bcf86cd799439013"
     *         createdAt:
     *           type: string
     *         updatedAt:
     *           type: string
     *
     *     ProductBody:
     *       type: object
     *       required:
     *         - productName
     *         - description
     *         - price
     *         - categoryId
     *         - brandId
     *       properties:
     *         productName:
     *           type: string
     *           example: "Laptop Dell XPS 15"
     *         description:
     *           type: string
     *           example: "Laptop de alto rendimiento"
     *         price:
     *           type: number
     *           example: 1299.99
     *         image:
     *           type: string
     *           example: "https://example.com/image.jpg"
     *         stock:
     *           type: integer
     *           example: 50
     *         categoryId:
     *           type: string
     *           example: "507f1f77bcf86cd799439012"
     *         brandId:
     *           type: string
     *           example: "507f1f77bcf86cd799439013"
     */

    // GET all products
    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Obtener todos los productos
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Lista de productos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     */
    router.get("/", async (req, res, next) => {
        try {
            const products = await productsService.getAll();
            res.json(products);
        } catch (error) {
            next(error);
        }
    });

    // GET product by ID
    /**
     * @swagger
     * /products/{id}:
     *   get:
     *     summary: Obtener un producto por ID
     *     tags: [Products]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Producto encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         description: Producto no encontrado
     */
    router.get("/:id", async (req, res, next) => {
        try {
            const product = await productsService.getById(req.params.id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    });

    // POST create product
    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Crear un nuevo producto
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductBody'
     *     responses:
     *       201:
     *         description: Producto creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     */
    router.post("/", async (req, res, next) => {
        try {
            const newProduct = await productsService.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    });

    // PUT update product
    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Actualizar completamente un producto
     *     tags: [Products]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductBody'
     *     responses:
     *       200:
     *         description: Producto actualizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     */
    router.put("/:id", async (req, res, next) => {
        try {
            const updated = await productsService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    });

    // DELETE product
    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Eliminar un producto
     *     tags: [Products]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Producto eliminado
     */
    router.delete("/:id", async (req, res, next) => {
        try {
            const result = await productsService.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    });

    return router;
};

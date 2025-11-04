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
     *
     *     Product:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *         productName:
     *           type: string
     *         description:
     *           type: string
     *         price:
     *           type: number
     *         image:
     *           type: string
     *         stock:
     *           type: integer
     *         categoryId:
     *           type: integer
     *         brandId:
     *           type: integer
     *
     *     ProductCreate:
     *       type: object
     *       required:
     *         - productName
     *         - description
     *         - price
     *         - stock
     *         - categoryId
     *         - brandId
     *       properties:
     *         productName:
     *           type: string
     *         description:
     *           type: string
     *         price:
     *           type: number
     *         image:
     *           type: string
     *         stock:
     *           type: integer
     *         categoryId:
     *           type: integer
     *         brandId:
     *           type: integer
     *
     *     ProductUpdate:
     *       type: object
     *       properties:
     *         productName:
     *           type: string
     *         description:
     *           type: string
     *         price:
     *           type: number
     *         image:
     *           type: string
     *         stock:
     *           type: integer
     *         categoryId:
     *           type: integer
     *         brandId:
     *           type: integer
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
     *           type: integer
     *     responses:
     *       200:
     *         description: Producto encontrado
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

    // GET products by category
    /**
     * @swagger
     * /products/categories/{categoryId}:
     *   get:
     *     summary: Obtener productos por categoría
     *     tags: [Products]
     *     parameters:
     *       - name: categoryId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Productos encontrados
     *       404:
     *         description: No hay productos en esta categoría
     */
    router.get("/categories/:categoryId", async (req, res, next) => {
        try {
            const products = await productsService.getByCategory(req.params.categoryId);
            if (!products.length)
                return res.status(404).json({ message: "No hay productos en esta categoría" });
            res.json(products);
        } catch (error) {
            next(error);
        }
    });

    // GET products by brand
    /**
     * @swagger
     * /products/brands/{brandId}:
     *   get:
     *     summary: Obtener productos por marca
     *     tags: [Products]
     *     parameters:
     *       - name: brandId
     *         in: path
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Productos encontrados
     *       404:
     *         description: No hay productos con esta marca
     */
    router.get("/brands/:brandId", async (req, res, next) => {
        try {
            const products = await productsService.getByBrand(req.params.brandId);
            if (!products.length)
                return res.status(404).json({ message: "No hay productos con esta marca" });
            res.json(products);
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
     *             $ref: '#/components/schemas/ProductCreate'
     *     responses:
     *       201:
     *         description: Producto creado exitosamente
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductCreate'
     *     responses:
     *       200:
     *         description: Producto actualizado
     */
    router.put("/:id", async (req, res, next) => {
        try {
            const updated = await productsService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    });

    // PATCH partial update
    /**
     * @swagger
     * /products/{id}:
     *   patch:
     *     summary: Actualizar parcialmente un producto
     *     tags: [Products]
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductUpdate'
     *     responses:
     *       200:
     *         description: Producto actualizado parcialmente
     */
    router.patch("/:id", async (req, res, next) => {
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

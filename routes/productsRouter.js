const express = require("express");
const router = express.Router();
const ProductsService = require("../services/productsService");
const service = new ProductsService();

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
 *         categoryId:
 *           type: integer
 *         brandId:
 *           type: integer
 */

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
        const products = await service.getAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
});

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", async (req, res, next) => {
    try {
        const product = await service.getById(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

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
        const products = await service.getByCategory(req.params.categoryId);
        if (products.length === 0) {
            return res.status(404).json({ message: "No hay productos en esta categoría" });
        }
        res.json(products);
    } catch (error) {
        next(error);
    }
});

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
        const products = await service.getByBrand(req.params.brandId);
        if (products.length === 0) {
            return res.status(404).json({ message: "No hay productos con esta marca" });
        }
        res.json(products);
    } catch (error) {
        next(error);
    }
});

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
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
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
        const newProduct = await service.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

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
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", async (req, res, next) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

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
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Producto actualizado parcialmente
 *       404:
 *         description: Producto no encontrado
 */
router.patch("/:id", async (req, res, next) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

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
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await service.delete(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

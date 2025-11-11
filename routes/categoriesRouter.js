const express = require("express");

module.exports = function (categoriesService, productsService) {
    const router = express.Router();

    // Inyectar productsService para validar eliminaciones
    categoriesService.injectProductsService(productsService);

    /**
     * @swagger
     * tags:
     *   name: Categories
     *   description: Endpoints para la gestión de categorías
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Category:
     *       type: object
     *       properties:
     *         _id:
     *           type: string
     *           example: "507f1f77bcf86cd799439011"
     *         categoryName:
     *           type: string
     *           example: "Electrónicos"
     *         description:
     *           type: string
     *           example: "Artículos electrónicos y gadgets"
     *         active:
     *           type: boolean
     *           example: true
     *         createdAt:
     *           type: string
     *         updatedAt:
     *           type: string
     *
     *     CategoryBody:
     *       type: object
     *       required:
     *         - categoryName
     *         - description
     *       properties:
     *         categoryName:
     *           type: string
     *           example: "Electrónicos"
     *         description:
     *           type: string
     *           example: "Artículos electrónicos y gadgets"
     *         active:
     *           type: boolean
     *           example: true
     */

    /**
     * @swagger
     * /categories:
     *   get:
     *     summary: Obtener todas las categorías
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: Lista de categorías
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    router.get("/", async (req, res, next) => {
        try {
            const categories = await categoriesService.getAll();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @swagger
     * /categories/{id}:
     *   get:
     *     summary: Obtener una categoría por ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Categoría encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Categoría no encontrada
     */
    router.get("/:id", async (req, res, next) => {
        try {
            const category = await categoriesService.getById(req.params.id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @swagger
     * /categories:
     *   post:
     *     summary: Crear una nueva categoría
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryBody'
     *     responses:
     *       201:
     *         description: Categoría creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Campos requeridos faltantes
     */
    router.post("/", async (req, res, next) => {
        try {
            const newCategory = await categoriesService.create(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @swagger
     * /categories/{id}:
     *   put:
     *     summary: Actualizar completamente una categoría
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryBody'
     *     responses:
     *       200:
     *         description: Categoría actualizada completamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Datos incorrectos
     *       404:
     *         description: Categoría no encontrada
     */
    router.put("/:id", async (req, res, next) => {
        try {
            const updated = await categoriesService.updateFull(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @swagger
     * /categories/{id}:
     *   delete:
     *     summary: Eliminar una categoría
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Categoría eliminada
     *       400:
     *         description: No se puede eliminar (tiene productos asociados)
     *       404:
     *         description: Categoría no encontrada
     */
    router.delete("/:id", async (req, res, next) => {
        try {
            const deleted = await categoriesService.delete(req.params.id);
            res.json({ message: "Categoría eliminada", deleted });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

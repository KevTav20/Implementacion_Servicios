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
     *         id:
     *           type: integer
     *           example: 1
     *         categoryName:
     *           type: string
     *           example: Electrónicos
     *         description:
     *           type: string
     *           example: Artículos electrónicos y gadgets
     *         active:
     *           type: boolean
     *           example: true
     *
     *     CategoryCreate:
     *       type: object
     *       required:
     *         - categoryName
     *         - description
     *       properties:
     *         categoryName:
     *           type: string
     *           example: Ropa
     *         description:
     *           type: string
     *           example: Categoría destinada a prendas de vestir
     *         active:
     *           type: boolean
     *           example: true
     *
     *     CategoryUpdate:
     *       type: object
     *       properties:
     *         categoryName:
     *           type: string
     *           example: Electrodomésticos
     *         description:
     *           type: string
     *           example: Productos para el hogar
     *         active:
     *           type: boolean
     *           example: false
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
    router.get("/", (req, res) => {
        res.json(categoriesService.getAll());
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
     *           type: integer
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
    router.get("/:id", (req, res) => {
        const category = categoriesService.getById(req.params.id);
        if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(category);
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
     *             $ref: '#/components/schemas/CategoryCreate'
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
    router.post("/", (req, res) => {
        const { categoryName, description, active } = req.body;

        if (!categoryName || !description) {
            return res.status(400).json({
                message: "categoryName y description son requeridos",
            });
        }

        const newCategory = categoriesService.create({ categoryName, description, active });
        res.status(201).json(newCategory);
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
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryCreate'
     *     responses:
     *       200:
     *         description: Categoría actualizada completamente
     *       400:
     *         description: Datos incorrectos
     *       404:
     *         description: Categoría no encontrada
     */
    router.put("/:id", (req, res) => {
        try {
            const updated = categoriesService.updateFull(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    /**
     * @swagger
     * /categories/{id}:
     *   patch:
     *     summary: Actualizar parcialmente una categoría
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryUpdate'
     *     responses:
     *       200:
     *         description: Categoría actualizada parcialmente
     *       404:
     *         description: Categoría no encontrada
     */
    router.patch("/:id", (req, res) => {
        try {
            const updated = categoriesService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(404).json({ message: error.message });
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
     *           type: integer
     *     responses:
     *       200:
     *         description: Categoría eliminada
     *       400:
     *         description: No se puede eliminar (tiene productos asociados)
     *       404:
     *         description: Categoría no encontrada
     */
    router.delete("/:id", (req, res) => {
        try {
            const deleted = categoriesService.delete(req.params.id);
            res.json({ message: "Categoría eliminada", deleted });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    return router;
};

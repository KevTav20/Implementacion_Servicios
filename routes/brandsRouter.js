const express = require("express");

module.exports = function (brandsService) {
    const router = express.Router();

    /**
     * @swagger
     * tags:
     *   name: Brands
     *   description: Endpoints para la gestión de marcas
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Brand:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *           example: 1
     *         brandName:
     *           type: string
     *           example: Nike
     *         description:
     *           type: string
     *           example: Marca deportiva
     *         active:
     *           type: boolean
     *           example: true
     *
     *     BrandCreate:
     *       type: object
     *       required:
     *         - brandName
     *         - description
     *       properties:
     *         brandName:
     *           type: string
     *           example: Adidas
     *         description:
     *           type: string
     *           example: Marca deportiva
     *         active:
     *           type: boolean
     *           example: true
     *
     *     BrandUpdate:
     *       type: object
     *       properties:
     *         brandName:
     *           type: string
     *           example: Puma
     *         description:
     *           type: string
     *           example: Marca deportiva
     *         active:
     *           type: boolean
     *           example: false
     */

    /**
     * @swagger
     * /brands:
     *   get:
     *     summary: Obtener todas las marcas
     *     tags: [Brands]
     *     responses:
     *       200:
     *         description: Lista de marcas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Brand'
     */
    router.get("/", (req, res) => {
        res.json(brandsService.getAll());
    });

    /**
     * @swagger
     * /brands/{id}:
     *   get:
     *     summary: Obtener una marca por ID
     *     tags: [Brands]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de la marca
     *     responses:
     *       200:
     *         description: Marca encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Brand'
     *       404:
     *         description: Marca no encontrada
     */
    router.get("/:id", (req, res) => {
        const brand = brandsService.getById(req.params.id);
        if (!brand) return res.status(404).json({ message: "Marca no encontrada" });
        res.json(brand);
    });

    /**
     * @swagger
     * /brands:
     *   post:
     *     summary: Crear una nueva marca
     *     tags: [Brands]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BrandCreate'
     *     responses:
     *       201:
     *         description: Marca creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Brand'
     */
    router.post("/", (req, res) => {
        const { brandName, description, active } = req.body;
        if (!brandName || !description) {
            return res.status(400).json({ message: "brandName y description son requeridos" });
        }
        const newBrand = brandsService.create({ brandName, description, active });
        res.status(201).json(newBrand);
    });

    /**
     * @swagger
     * /brands/{id}:
     *   put:
     *     summary: Actualizar completamente una marca
     *     tags: [Brands]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de la marca
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BrandCreate'
     *     responses:
     *       200:
     *         description: Marca actualizada completamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Brand'
     *       404:
     *         description: Marca no encontrada
     */
    router.put("/:id", (req, res) => {
        try {
            const updated = brandsService.updateFull(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    /**
     * @swagger
     * /brands/{id}:
     *   patch:
     *     summary: Actualizar parcialmente una marca
     *     tags: [Brands]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de la marca
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BrandUpdate'
     *     responses:
     *       200:
     *         description: Marca actualizada parcialmente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Brand'
     *       404:
     *         description: Marca no encontrada
     */
    router.patch("/:id", (req, res) => {
        try {
            const updated = brandsService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });

    /**
     * @swagger
     * /brands/{id}:
     *   delete:
     *     summary: Eliminar una marca
     *     tags: [Brands]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID de la marca
     *     responses:
     *       200:
     *         description: Marca eliminada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 deleted:
     *                   type: object
     *       400:
     *         description: No se puede eliminar (tiene productos asociados)
     *       404:
     *         description: Marca no encontrada
     */
    router.delete("/:id", (req, res) => {
        try {
            const deleted = brandsService.delete(req.params.id);
            res.json({ message: "Marca eliminada", deleted });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    return router;
};

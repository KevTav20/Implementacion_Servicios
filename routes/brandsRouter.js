const express = require('express');
const router = express.Router();

const ProductsService = require('../services/productsService');
const productsService = new ProductsService(); // ✅ instancia única para validar dependencias

const BrandsService = require('../services/brandsService');
const service = new BrandsService(productsService); // ✅ dependencia inyectada

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
 *         brandName:
 *           type: string
 *         description:
 *           type: string
 *         active:
 *           type: boolean
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
    res.json(service.getAll());
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marca encontrada
 *       404:
 *         description: Marca no encontrada
 */
router.get("/:id", (req, res) => {
    const brand = service.getById(req.params.id);
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
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 */
router.post("/", (req, res) => {
    const { brandName, description, active } = req.body;

    if (!brandName || !description) {
        return res.status(400).json({ message: "brandName y description son requeridos" });
    }

    const newBrand = service.create({ brandName, description, active });
    res.status(201).json(newBrand);
});

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Actualizar completamente una marca
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marca actualizada completamente
 *       404:
 *         description: Marca no encontrada
 */
router.put("/:id", (req, res) => {
    try {
        const updated = service.updateFull(req.params.id, req.body);
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
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Marca actualizada parcialmente
 *       404:
 *         description: Marca no encontrada
 */
router.patch("/:id", (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
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
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Marca eliminada
 *       400:
 *         description: No se puede eliminar (tiene productos asociados)
 *       404:
 *         description: Marca no encontrada
 */
router.delete("/:id", (req, res) => {
    try {
        const deleted = service.delete(req.params.id);
        res.json({ message: "Marca eliminada", deleted });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

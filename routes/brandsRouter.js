const express = require("express");

module.exports = function (brandsService, productsService) {
    const router = express.Router();

    // Asegurar dependencia correcta
    brandsService.injectProductsService(productsService);

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
     *         _id:
     *           type: string
     *           example: "507f1f77bcf86cd799439011"
     *         brandName:
     *           type: string
     *           example: "Nike"
     *         description:
     *           type: string
     *           example: "Marca deportiva internacional"
     *         active:
     *           type: boolean
     *           example: true
     *         createdAt:
     *           type: string
     *         updatedAt:
     *           type: string
     *
     *     BrandBody:
     *       type: object
     *       required:
     *         - brandName
     *         - description
     *       properties:
     *         brandName:
     *           type: string
     *           example: "Nike"
     *         description:
     *           type: string
     *           example: "Marca deportiva internacional"
     *         active:
     *           type: boolean
     *           example: true
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
    router.get("/", async (req, res, next) => {
        try {
            const brands = await brandsService.getAll();
            res.json(brands);
        } catch (error) {
            next(error);
        }
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
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
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
    router.get("/:id", async (req, res, next) => {
        try {
            const brand = await brandsService.getById(req.params.id);
            res.json(brand);
        } catch (error) {
            next(error);
        }
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
     *             $ref: '#/components/schemas/BrandBody'
     *     responses:
     *       201:
     *         description: Marca creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Brand'
     */
    router.post("/", async (req, res, next) => {
        try {
            const newBrand = await brandsService.create(req.body);
            res.status(201).json(newBrand);
        } catch (error) {
            next(error);
        }
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
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BrandBody'
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
    router.put("/:id", async (req, res, next) => {
        try {
            const updated = await brandsService.updateFull(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
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
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Marca eliminada exitosamente
     *       400:
     *         description: No se puede eliminar (tiene productos asociados)
     *       404:
     *         description: Marca no encontrada
     */
    router.delete("/:id", async (req, res, next) => {
        try {
            const deleted = await brandsService.delete(req.params.id);
            res.json({ message: "Marca eliminada", deleted });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

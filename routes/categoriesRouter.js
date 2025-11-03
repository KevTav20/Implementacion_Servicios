const express = require("express");
const router = express.Router();

const CategoriesService = require("../services/categoriesService");
const BrandsService = require("../services/brandsService");
const ProductsService = require("../services/productsService");

// 1. Crear instancias principales
const brandsService = new BrandsService();
const categoriesService = new CategoriesService();

// 2. Crear ProductsService con brands y categories (inyección de dependencias)
const productsService = new ProductsService(brandsService, categoriesService);

// 3. Inyectar ProductsService en brands y categories
brandsService.injectProductsService(productsService);
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
 *         categoryName:
 *           type: string
 *         description:
 *           type: string
 *         active:
 *           type: boolean
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
 */
router.get('/', (req, res) => {
    res.json(service.getAll());
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:id', (req, res) => {
    const category = service.getById(req.params.id);
    if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
    }
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
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post('/', (req, res) => {
    const { categoryName, description, active } = req.body;

    if (!categoryName || !description) {
        return res.status(400).json({
            message: "categoryName y description son requeridos"
        });
    }

    const newCategory = service.create({ categoryName, description, active });
    res.status(201).json(newCategory);
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar completamente una categoría
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Categoría actualizada completamente
 *       404:
 *         description: No encontrada
 */
router.put('/:id', (req, res) => {
    try {
        const updated = service.updateFull(req.params.id, req.body);
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
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Categoría actualizada parcialmente
 *       404:
 *         description: No encontrada
 */
router.patch('/:id', (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
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
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       400:
 *         description: No se puede eliminar (tiene productos asociados)
 *       404:
 *         description: No encontrada
 */
router.delete('/:id', (req, res) => {
    try {
        const deleted = service.delete(req.params.id);
        res.json({ message: 'Categoría eliminada', deleted });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

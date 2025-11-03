const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');

const service = new UsersService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', (req, res) => {
    res.json(service.getAll());
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', (req, res) => {
    const user = service.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post('/', (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password)
        return res.status(400).json({ message: 'name, username y password son requeridos' });

    const newUser = service.create({ name, username, password });
    res.status(201).json({ message: 'Usuario creado', data: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Reemplazar un usuario completamente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Usuario actualizado completamente
 */
router.put('/:id', (req, res) => {
    try {
        const updated = service.updateFull(req.params.id, req.body);
        res.json({ message: 'Usuario actualizado', data: updated });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Usuario modificado parcialmente
 */
router.patch('/:id', (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json({ message: 'Usuario modificado', data: updated });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/:id', (req, res) => {
    try {
        const deleted = service.delete(req.params.id);
        res.json({ message: 'Usuario eliminado', data: deleted });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;

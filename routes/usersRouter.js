const express = require('express');

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
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         username:
 *           type: string
 *           example: "juanperez"
 *         password:
 *           type: string
 *           example: "password123"
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     UserBody:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         username:
 *           type: string
 *           example: "juanperez"
 *         password:
 *           type: string
 *           example: "password123"
 */

module.exports = function (usersService) {
    const router = express.Router();

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Obtener todos los usuarios
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
    router.get('/', async (req, res, next) => {
        try {
            const users = await usersService.getAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
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
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: Usuario no encontrado
     */
    router.get('/:id', async (req, res, next) => {
        try {
            const user = await usersService.getById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Crear un nuevo usuario
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserBody'
     *     responses:
     *       201:
     *         description: Usuario creado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */
    router.post('/', async (req, res, next) => {
        try {
            const newUser = await usersService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    });

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Actualizar completamente un usuario
     *     tags: [Users]
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
     *             $ref: '#/components/schemas/UserBody'
     *     responses:
     *       200:
     *         description: Usuario actualizado completamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */
    router.put('/:id', async (req, res, next) => {
        try {
            const updated = await usersService.updateFull(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
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
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     requestBody:
     *       required: false
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Juan Pérez"
     *               username:
     *                 type: string
     *                 example: "juanperez"
     *               password:
     *                 type: string
     *                 example: "password123"
     *     responses:
     *       200:
     *         description: Usuario actualizado parcialmente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: Usuario no encontrado
     */
    router.patch('/:id', async (req, res, next) => {
        try {
            const updated = await usersService.update(req.params.id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
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
     *         schema:
     *           type: string
     *         example: "507f1f77bcf86cd799439011"
     *     responses:
     *       200:
     *         description: Usuario eliminado
     */
    router.delete('/:id', async (req, res, next) => {
        try {
            const deleted = await usersService.delete(req.params.id);
            res.json({ message: 'Usuario eliminado', deleted });
        } catch (error) {
            next(error);
        }
    });

    return router;
};

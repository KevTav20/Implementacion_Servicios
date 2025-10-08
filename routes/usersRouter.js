
const express = require('express');
const router = express.Router();
const UsersService = require('../services/usersService');

const service = new UsersService();

// GET todos los usuarios
router.get('/', (req, res) => {
    res.json(service.getAll());
});

// GET usuario por id
router.get('/:id', (req, res) => {
    const user = service.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
});

// POST crear usuario
router.post('/', (req, res) => {
    const { name, username, password } = req.body;
    if (!name || !username || !password) return res.status(400).json({ message: 'name, username y password son requeridos' });

    const newUser = service.create({ name, username, password });
    res.status(201).json({ message: 'Usuario creado', data: newUser });
});

// PUT actualizar usuario completo
router.put('/:id', (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json({ message: 'Usuario actualizado', data: updated });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// PATCH actualizar parcialmente
router.patch('/:id', (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json({ message: 'Usuario modificado', data: updated });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DELETE eliminar usuario
router.delete('/:id', (req, res) => {
    try {
        const deleted = service.delete(req.params.id);
        res.json({ message: 'Usuario eliminado', data: deleted });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;

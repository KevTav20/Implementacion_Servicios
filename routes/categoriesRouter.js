// const express = require('express');
// const router = express.Router();

// // Arreglo estático de categorías
// let categories = [
//     {
//         id: 1,
//         categoryName: 'Electronics',
//         description: 'Devices, gadgets, and accessories for daily use',
//         active: true,
//     },
//     {
//         id: 2,
//         categoryName: 'Books',
//         description: 'Printed and digital books across all genres',
//         active: true,
//     },
//     {
//         id: 3,
//         categoryName: 'Clothing',
//         description: "Men's, women's and children's fashion",
//         active: true,
//     },
//     {
//         id: 4,
//         categoryName: 'Sports',
//         description: 'Equipment and accessories for different sports',
//         active: true,
//     },
//     {
//         id: 5,
//         categoryName: 'Home & Kitchen',
//         description: 'Furniture, appliances and utensils for the home',
//         active: false,
//     },
//     {
//         id: 6,
//         categoryName: 'Toys',
//         description: 'Games and toys for children of all ages',
//         active: true,
//     },
//     {
//         id: 7,
//         categoryName: 'Beauty',
//         description: 'Cosmetics, skincare and personal care products',
//         active: true,
//     },
//     {
//         id: 8,
//         categoryName: 'Automotive',
//         description: 'Car accessories, tools and maintenance products',
//         active: false,
//     },
//     {
//         id: 9,
//         categoryName: 'Music',
//         description: 'Instruments, records and audio equipment',
//         active: true,
//     },
//     {
//         id: 10,
//         categoryName: 'Health',
//         description: 'Wellness and medical care products',
//         active: true,
//     },
// ];

// // GET todas las categorías
// router.get('/', (req, res) => {
//     res.json(categories);
// });

// // GET categoría por id
// router.get('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const category = categories.find((c) => c.id === id);

//     if (!category) {
//         return res.status(404).json({ message: 'Categoría no encontrada' });
//     }

//     res.json(category);
// });

// // POST nueva categoría
// router.post('/', (req, res) => {
//     const { categoryName, description, active } = req.body;

//     if (!categoryName || !description) {
//         return res.status(400).json({ message: "categoryName y description son requeridos" });
//     }

//     const newCategory = {
//         id: categories.length ? categories[categories.length - 1].id + 1 : 1,
//         categoryName,
//         description,
//         active: active ?? true,
//     };

//     categories.push(newCategory);
//     res.status(201).json(newCategory);
// });

// // PUT actualizar categoría completa
// router.put('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = categories.findIndex((c) => c.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: 'Categoría no encontrada' });
//     }

//     const { categoryName, description, active } = req.body;

//     if (!categoryName || !description) {
//         return res.status(400).json({ message: "categoryName y description son requeridos" });
//     }

//     categories[index] = { id, categoryName, description, active: active ?? true };

//     res.json(categories[index]);
// });

// // PATCH actualizar parcialmente categoría
// router.patch('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const category = categories.find((c) => c.id === id);

//     if (!category) {
//         return res.status(404).json({ message: 'Categoría no encontrada' });
//     }

//     const { categoryName, description, active } = req.body;

//     if (categoryName !== undefined) category.categoryName = categoryName;
//     if (description !== undefined) category.description = description;
//     if (active !== undefined) category.active = active;

//     res.json(category);
// });

// // DELETE eliminar categoría
// router.delete('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = categories.findIndex((c) => c.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: 'Categoría no encontrada' });
//     }

//     const deleted = categories.splice(index, 1);
//     res.json({ message: 'Categoría eliminada', deleted: deleted[0] });
// });


const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoriesService');
const service = new CategoriesService();

// GET todas las categorías
router.get('/', (req, res) => {
    res.json(service.getAll());
});

// GET categoría por id
router.get('/:id', (req, res) => {
    const category = service.getById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(category);
});

// POST nueva categoría
router.post('/', (req, res) => {
    const { categoryName, description, active } = req.body;
    if (!categoryName || !description) return res.status(400).json({ message: "categoryName y description son requeridos" });

    const newCategory = service.create({ categoryName, description, active });
    res.status(201).json(newCategory);
});

// PUT actualizar categoría completa
router.put('/:id', (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// PATCH actualizar parcialmente categoría
router.patch('/:id', (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DELETE eliminar categoría
router.delete('/:id', (req, res) => {
    try {
        const deleted = service.delete(req.params.id);
        res.json({ message: 'Categoría eliminada', deleted });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;

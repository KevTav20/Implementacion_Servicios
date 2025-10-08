// const express = require('express');
// const router = express.Router();

// // Arreglo estático de marcas (brands)
// let brands = [
//     { id: 1, brandName: "Nike", description: "Sportswear and footwear", active: true },
//     { id: 2, brandName: "Adidas", description: "Athletic apparel and shoes", active: true },
//     { id: 3, brandName: "Apple", description: "Electronics and technology products", active: true },
//     { id: 4, brandName: "Samsung", description: "Consumer electronics and appliances", active: true },
//     { id: 5, brandName: "Sony", description: "Electronics, gaming, and entertainment", active: true },
//     { id: 6, brandName: "Coca-Cola", description: "Beverages and soft drinks", active: true },
//     { id: 7, brandName: "Pepsi", description: "Beverages and snacks", active: true },
//     { id: 8, brandName: "Toyota", description: "Automobiles and vehicles", active: true },
//     { id: 9, brandName: "Honda", description: "Automobiles, motorcycles, and engines", active: true },
//     { id: 10, brandName: "Microsoft", description: "Software, devices, and technology", active: true }
// ];

// // GET todas las marcas
// router.get("/", (req, res) => {
//     res.json(brands);
// });

// // GET marca por id
// router.get("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const brand = brands.find(b => b.id === id);

//     if (!brand) {
//         return res.status(404).json({ message: "Marca no encontrada" });
//     }

//     res.json(brand);
// });

// // POST nueva marca
// router.post("/", (req, res) => {
//     const { brandName, description, active } = req.body;

//     if (!brandName || !description) {
//         return res.status(400).json({ message: "brandName y description son requeridos" });
//     }

//     const newBrand = {
//         id: brands.length ? brands[brands.length - 1].id + 1 : 1,
//         brandName,
//         description,
//         active: active ?? true
//     };

//     brands.push(newBrand);
//     res.status(201).json(newBrand);
// });

// // PUT actualizar marca completa (sobrescribe)
// router.put("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = brands.findIndex(b => b.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: "Marca no encontrada" });
//     }

//     const { brandName, description, active } = req.body;

//     if (!brandName || !description) {
//         return res.status(400).json({ message: "brandName y description son requeridos" });
//     }

//     brands[index] = { id, brandName, description, active: active ?? true };

//     res.json(brands[index]);
// });

// // PATCH actualizar parcialmente
// router.patch("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const brand = brands.find(b => b.id === id);

//     if (!brand) {
//         return res.status(404).json({ message: "Marca no encontrada" });
//     }

//     const { brandName, description, active } = req.body;

//     if (brandName !== undefined) brand.brandName = brandName;
//     if (description !== undefined) brand.description = description;
//     if (active !== undefined) brand.active = active;

//     res.json(brand);
// });

// // DELETE eliminar marca
// router.delete("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = brands.findIndex(b => b.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: "Marca no encontrada" });
//     }

//     const deleted = brands.splice(index, 1);
//     res.json({ message: "Marca eliminada", deleted: deleted[0] });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const BrandsService = require('../services/brandsService');

const service = new BrandsService();

// GET todas las marcas
router.get("/", (req, res) => {
    res.json(service.getAll());
});

// GET marca por id
router.get("/:id", (req, res) => {
    const brand = service.getById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Marca no encontrada" });
    res.json(brand);
});

// POST nueva marca
router.post("/", (req, res) => {
    const { brandName, description, active } = req.body;
    if (!brandName || !description) return res.status(400).json({ message: "brandName y description son requeridos" });

    const newBrand = service.create({ brandName, description, active });
    res.status(201).json(newBrand);
});

// PUT actualizar marca completa
router.put("/:id", (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// PATCH actualizar parcialmente marca
router.patch("/:id", (req, res) => {
    try {
        const updated = service.update(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DELETE eliminar marca
router.delete("/:id", (req, res) => {
    try {
        const deleted = service.delete(req.params.id);
        res.json({ message: "Marca eliminada", deleted });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;

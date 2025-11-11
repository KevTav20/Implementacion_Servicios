const Brand = require('../models/Brand');
const Product = require('../models/Product');

class BrandsService {
    constructor() {
        this.productsService = null; // Se inyectará después
    }

    injectProductsService(productsService) {
        this.productsService = productsService;
    }

    async getAll() {
        return await Brand.find();
    }

    async getById(id) {
        const brand = await Brand.findById(id);
        if (!brand) throw new Error("Brand Not Found");
        return brand;
    }

    async create(data) {
        const { brandName, description, active } = data;

        if (!brandName || !description) {
            throw new Error("brandName y description son requeridos");
        }

        const newBrand = new Brand({
            brandName,
            description,
            active: active !== undefined ? active : true
        });

        return await newBrand.save();
    }

    async update(id, changes) {
        const brand = await Brand.findByIdAndUpdate(
            id,
            { $set: changes },
            { new: true, runValidators: true }
        );

        if (!brand) throw new Error("Brand Not Found");
        return brand;
    }

    async updateFull(id, data) {
        const { brandName, description, active } = data;

        if (!brandName || !description) {
            throw new Error("brandName y description son requeridos");
        }

        const updated = await Brand.findByIdAndUpdate(
            id,
            { brandName, description, active: active !== undefined ? active : true },
            { new: true, runValidators: true }
        );

        if (!updated) throw new Error("Brand Not Found");
        return updated;
    }

    async delete(id) {
        // Validación de integridad referencial
        const hasProducts = await Product.exists({ brandId: id });

        if (hasProducts) {
            throw new Error("No se puede eliminar la marca porque tiene productos asociados");
        }

        const deleted = await Brand.findByIdAndDelete(id);
        if (!deleted) throw new Error("Brand Not Found");
        return deleted;
    }
}

module.exports = BrandsService;

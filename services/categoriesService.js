const Category = require('../models/Category');
const Product = require('../models/Product');

class CategoriesService {
    constructor() {
        this.productsService = null; // se inyecta después
    }

    injectProductsService(productsService) {
        this.productsService = productsService;
    }

    async getAll() {
        return await Category.find();
    }

    async getById(id) {
        const category = await Category.findById(id);
        if (!category) throw new Error("Category Not Found");
        return category;
    }

    async create(data) {
        const { categoryName, description, active } = data;

        if (!categoryName || !description) {
            throw new Error("categoryName and description required");
        }

        const newCategory = new Category({
            categoryName,
            description,
            active: active !== undefined ? active : true
        });
        
        return await newCategory.save();
    }

    async update(id, changes) {
        const category = await Category.findByIdAndUpdate(
            id,
            { $set: changes },
            { new: true, runValidators: true }
        );

        if (!category) throw new Error("Category Not Found");
        return category;
    }

    async updateFull(id, data) {
        const { categoryName, description, active } = data;

        if (!categoryName || !description) {
            throw new Error("categoryName and description required");
        }

        const updated = await Category.findByIdAndUpdate(
            id,
            { categoryName, description, active: active !== undefined ? active : true },
            { new: true, runValidators: true }
        );

        if (!updated) throw new Error("Category Not Found");
        return updated;
    }

    async delete(id) {
        // Verificar si hay productos asociados
        const hasProducts = await Product.exists({ categoryId: id });

        if (hasProducts) {
            throw new Error("Cannot delete category because products exist");
        }

        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) throw new Error("Category Not Found");
        return deleted;
    }
}

module.exports = CategoriesService;

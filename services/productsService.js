const Product = require('../models/Product');
const { faker } = require("@faker-js/faker");

class ProductsService {
    constructor(brandsService, categoriesService) {
        this.brandsService = brandsService;
        this.categoriesService = categoriesService;
    }

    async getAll() {
        return await Product.find().populate('categoryId', 'categoryName description').populate('brandId', 'brandName description');
    }

    async getById(id) {
        const product = await Product.findById(id)
            .populate('categoryId', 'categoryName description')
            .populate('brandId', 'brandName description');
        
        if (!product) throw new Error("Product Not Found");
        return product;
    }

    async getByCategory(categoryId) {
        return await Product.find({ categoryId })
            .populate('categoryId', 'categoryName description')
            .populate('brandId', 'brandName description');
    }

    async getByBrand(brandId) {
        return await Product.find({ brandId })
            .populate('categoryId', 'categoryName description')
            .populate('brandId', 'brandName description');
    }

    async create(data) {
        const { productName, description, price, image, stock, categoryId, brandId } = data;

        // Validación correcta sin confundir valores 0
        if (
            productName === undefined ||
            description === undefined ||
            price === undefined ||
            categoryId === undefined ||
            brandId === undefined
        ) {
            throw new Error("Required fields missing");
        }

        // Validar existencia de brand y category
        const brandExists = await this.brandsService.getById(brandId);
        const categoryExists = await this.categoriesService.getById(categoryId);

        if (!brandExists) {
            throw new Error("Brand does not exist");
        }

        if (!categoryExists) {
            throw new Error("Category does not exist");
        }

        const newProduct = new Product({
            productName,
            description,
            price,
            image: image || faker.image.url(),
            stock: stock === undefined ? faker.number.int({ min: 0, max: 50 }) : stock,
            categoryId,
            brandId,
        });

        return await newProduct.save();
    }

    async update(id, changes) {
        // Validar cambios de brand
        if (changes.brandId !== undefined) {
            const brand = await this.brandsService.getById(changes.brandId);
            if (!brand) throw new Error("Brand does not exist");
        }

        // Validar cambios de categoría
        if (changes.categoryId !== undefined) {
            const category = await this.categoriesService.getById(changes.categoryId);
            if (!category) throw new Error("Category does not exist");
        }

        const updated = await Product.findByIdAndUpdate(
            id,
            { $set: changes },
            { new: true, runValidators: true }
        )
        .populate('categoryId', 'categoryName description')
        .populate('brandId', 'brandName description');

        if (!updated) throw new Error("Product Not Found");
        return updated;
    }

    async delete(id) {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) throw new Error("Product Not Found");
        return deleted;
    }
}

module.exports = ProductsService;

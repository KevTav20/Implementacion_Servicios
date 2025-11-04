const { faker } = require("@faker-js/faker");

class ProductsService {
    constructor(brandsService, categoriesService) {
        this.brandsService = brandsService;
        this.categoriesService = categoriesService;

        this.products = [];
        this.generate();
    }

    generate() {
        for (let i = 1; i <= 20; i++) {
            this.products.push({
                id: i,
                productName: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price()),
                image: faker.image.url(),
                stock: faker.number.int({ min: 0, max: 100 }),
                categoryId: faker.number.int({ min: 1, max: 5 }),
                brandId: faker.number.int({ min: 1, max: 5 }),
            });
        }
    }

    async getAll() {
        return this.products;
    }

    async getById(id) {
        const product = this.products.find(p => p.id === parseInt(id));
        if (!product) throw new Error("Product Not Found");
        return product;
    }

    async getByCategory(categoryId) {
        return this.products.filter(p => p.categoryId === parseInt(categoryId));
    }

    async getByBrand(brandId) {
        return this.products.filter(p => p.brandId === parseInt(brandId));
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
        const brandExists = this.brandsService.getById(brandId);
        const categoryExists = this.categoriesService.getById(categoryId);

        if (!brandExists && !categoryExists) {
            throw new Error("Brand and Category do not exist");
        }

        if (!brandExists) {
            throw new Error("Brand does not exist");
        }

        if (!categoryExists) {
            throw new Error("Category does not exist");
        }

        const newProduct = {
            id: this.products.length + 1,
            productName,
            description,
            price,
            image: image || faker.image.url(),
            stock: stock === undefined ? faker.number.int({ min: 0, max: 50 }) : stock,
            categoryId,
            brandId,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    async update(id, changes) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index === -1) throw new Error("Product Not Found");

        // Validar cambios de brand
        if (changes.brandId !== undefined) {
            const brand = this.brandsService.getById(changes.brandId);
            if (!brand) throw new Error("Brand does not exist");
        }

        // Validar cambios de categoría
        if (changes.categoryId !== undefined) {
            const category = this.categoriesService.getById(changes.categoryId);
            if (!category) throw new Error("Category does not exist");
        }

        const updated = {
            ...this.products[index],
            ...changes,
        };

        this.products[index] = updated;
        return updated;
    }

    async delete(id) {
        const index = this.products.findIndex(p => p.id === parseInt(id));
        if (index === -1) throw new Error("Product Not Found");

        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductsService;

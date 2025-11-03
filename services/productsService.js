const { faker } = require("@faker-js/faker");

class ProductsService {
    constructor() {
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
                categoryId: faker.number.int({ min: 1, max: 5 }),
                brandId: faker.number.int({ min: 1, max: 5 }),
            });
        }
    }

    async getAll() {
        return this.products;
    }

    async getById(id) {
        const product = this.products.find((p) => p.id === parseInt(id));
        if (!product) throw new Error("Product Not Found");
        return product;
    }

    async getByCategory(categoryId) {
        const list = this.products.filter((p) => p.categoryId === parseInt(categoryId));
        return list;
    }

    async getByBrand(brandId) {
        const list = this.products.filter((p) => p.brandId === parseInt(brandId));
        return list;
    }

    async create(data) {
        const { productName, description, price, image, categoryId, brandId } = data;

        if (!productName || !description || !price || !categoryId || !brandId) {
            throw new Error("Required fields missing");
        }

        const newProduct = {
            id: this.products.length + 1,
            productName,
            description,
            price,
            image: image || faker.image.url(),
            categoryId,
            brandId,
        };

        this.products.push(newProduct);
        return newProduct;
    }

    async update(id, changes) {
        const index = this.products.findIndex((p) => p.id === parseInt(id));
        if (index === -1) throw new Error("Product Not Found");

        const updated = {
            ...this.products[index],
            ...changes,
        };

        this.products[index] = updated;
        return updated;
    }

    async delete(id) {
        const index = this.products.findIndex((p) => p.id === parseInt(id));
        if (index === -1) throw new Error("Product Not Found");

        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductsService;

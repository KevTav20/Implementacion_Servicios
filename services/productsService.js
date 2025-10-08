const { faker } = require("@faker-js/faker");

class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const generateProducts = (limit = 20) => {
            for (let index = 0; index < limit; index++) {
                this.products.push({
                    id: index + 1,
                    productName: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: parseFloat(faker.commerce.price()),
                    image: faker.image.url(),
                    categoryId: faker.number.int({ min: 1, max: 5 }),
                    brandId: faker.number.int({ min: 1, max: 5 }),
                });
            }
        };
        generateProducts(20);
    }

    create({ productName, description, price, image, categoryId, brandId }) {
        if (!productName || !description || !price || !categoryId || !brandId) {
            throw new Error(
                "Campos requeridos: productName, description, price, categoryId, brandId"
            );
        }

        const newProduct = {
            id: this.products.length
                ? this.products[this.products.length - 1].id + 1
                : 1,
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

    create2(data) {
        const newProduct = {
            id: this.products.length
                ? this.products[this.products.length - 1].id + 1
                : 1,
            ...data
        }
        this.products.push(newProduct)
        return newProduct
    }

    update(id, changes) {
        const index = this.products.findIndex(item => item.id == id)
        if (index === -1) {
            throw new Error("Product Not Found")
        }
        const product = this.products[index]
        this.products[index] = {
            ...product, //con esto mantenemos las propiedades del producto
            ...changes//y asi borra todo, solo se cambia la propiedad actualizada
        }
        return this.products[index]
    }


    delete(id) {
        const index = this.products.findIndex(item => item.id == id)
        if (index === -1) {
            throw new Error("Product Not Found")
        }
        this.products.splice(index, 1)
        return { id }
    }

    getAll() {
        return this.products;
    }

    getById(id) {
        return this.products.find((p) => p.id === parseInt(id));
    }
}

module.exports = ProductsService;

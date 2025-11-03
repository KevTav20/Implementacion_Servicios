class BrandsService {
    constructor() {
        this.brands = [
            { id: 1, brandName: "Nike", description: "Sportswear and footwear", active: true },
            { id: 2, brandName: "Adidas", description: "Athletic apparel and shoes", active: true },
            { id: 3, brandName: "Apple", description: "Electronics and technology products", active: true },
            { id: 4, brandName: "Samsung", description: "Consumer electronics and appliances", active: true },
            { id: 5, brandName: "Sony", description: "Electronics, gaming, and entertainment", active: true },
            { id: 6, brandName: "Coca-Cola", description: "Beverages and soft drinks", active: true },
            { id: 7, brandName: "Pepsi", description: "Beverages and snacks", active: true },
            { id: 8, brandName: "Toyota", description: "Automobiles and vehicles", active: true },
            { id: 9, brandName: "Honda", description: "Automobiles, motorcycles, and engines", active: true },
            { id: 10, brandName: "Microsoft", description: "Software, devices, and technology", active: true }
        ];

        this.productsService = null; // Se inyectará después
    }

    injectProductsService(productsService) {
        this.productsService = productsService;
    }

    getAll() {
        return this.brands;
    }

    getById(id) {
        return this.brands.find(b => b.id === parseInt(id));
    }

    create(data) {
        const newBrand = {
            id: this.brands.length ? this.brands[this.brands.length - 1].id + 1 : 1,
            active: true,
            ...data
        };

        this.brands.push(newBrand);
        return newBrand;
    }

    update(id, changes) {
        const index = this.brands.findIndex(b => b.id == id);
        if (index === -1) throw new Error("Brand Not Found");

        this.brands[index] = {
            ...this.brands[index],
            ...changes
        };

        return this.brands[index];
    }

    updateFull(id, data) {
        const index = this.brands.findIndex(b => b.id == id);
        if (index === -1) throw new Error("Brand Not Found");

        if (!data.brandName || !data.description) {
            throw new Error("brandName y description son requeridos");
        }

        const updated = {
            id: parseInt(id),
            brandName: data.brandName,
            description: data.description,
            active: data.active ?? true
        };

        this.brands[index] = updated;
        return updated;
    }

    delete(id) {
        const brandId = parseInt(id);

        // Validación de integridad referencial
        if (this.productsService) {
            const hasProducts = this.productsService.products.some(
                p => p.brandId === brandId
            );

            if (hasProducts) {
                throw new Error("No se puede eliminar la marca porque tiene productos asociados");
            }
        }

        const index = this.brands.findIndex(b => b.id === brandId);
        if (index === -1) throw new Error("Brand Not Found");

        return this.brands.splice(index, 1)[0];
    }
}

module.exports = BrandsService;

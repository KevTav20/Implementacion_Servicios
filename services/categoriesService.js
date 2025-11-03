class CategoriesService {
    constructor() {
        this.categories = [
            { id: 1, categoryName: 'Electronics', description: 'Devices, gadgets, and accessories', active: true },
            { id: 2, categoryName: 'Books', description: 'Printed and digital books', active: true },
            { id: 3, categoryName: 'Clothing', description: 'Fashion items', active: true },
            { id: 4, categoryName: 'Sports', description: 'Sports equipment', active: true },
            { id: 5, categoryName: 'Home & Kitchen', description: 'Home appliances', active: false },
        ];

        this.productsService = null; // se inyecta después
    }

    injectProductsService(productsService) {
        this.productsService = productsService;
    }

    getAll() {
        return this.categories;
    }

    getById(id) {
        return this.categories.find(c => c.id === parseInt(id));
    }

    create(data) {
        const newCategory = {
            id: this.categories.length + 1,
            active: true,
            ...data
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id, changes) {
        const index = this.categories.findIndex(c => c.id == id);
        if (index === -1) throw new Error("Category Not Found");

        this.categories[index] = {
            ...this.categories[index],
            ...changes
        };

        return this.categories[index];
    }

    updateFull(id, data) {
        const index = this.categories.findIndex(c => c.id == id);
        if (index === -1) throw new Error("Category Not Found");

        if (!data.categoryName || !data.description) {
            throw new Error("categoryName and description required");
        }

        const updated = {
            id: parseInt(id),
            categoryName: data.categoryName,
            description: data.description,
            active: data.active ?? true
        };

        this.categories[index] = updated;
        return updated;
    }

    delete(id) {
        const categoryId = parseInt(id);

        if (this.productsService) {
            const hasProducts = this.productsService.products.some(
                p => p.categoryId === categoryId
            );

            if (hasProducts) {
                throw new Error("Cannot delete category because products exist");
            }
        }

        const index = this.categories.findIndex(c => c.id === categoryId);
        if (index === -1) throw new Error("Category Not Found");

        return this.categories.splice(index, 1)[0];
    }
}

module.exports = CategoriesService;

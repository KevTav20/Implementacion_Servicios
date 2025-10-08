class CategoriesService {
    constructor() {
        this.categories = [
            { id: 1, categoryName: 'Electronics', description: 'Devices, gadgets, and accessories for daily use', active: true },
            { id: 2, categoryName: 'Books', description: 'Printed and digital books across all genres', active: true },
            { id: 3, categoryName: 'Clothing', description: "Men's, women's and children's fashion", active: true },
            { id: 4, categoryName: 'Sports', description: 'Equipment and accessories for different sports', active: true },
            { id: 5, categoryName: 'Home & Kitchen', description: 'Furniture, appliances and utensils for the home', active: false },
            { id: 6, categoryName: 'Toys', description: 'Games and toys for children of all ages', active: true },
            { id: 7, categoryName: 'Beauty', description: 'Cosmetics, skincare and personal care products', active: true },
            { id: 8, categoryName: 'Automotive', description: 'Car accessories, tools and maintenance products', active: false },
            { id: 9, categoryName: 'Music', description: 'Instruments, records and audio equipment', active: true },
            { id: 10, categoryName: 'Health', description: 'Wellness and medical care products', active: true },
        ];
    }

    getAll() {
        return this.categories;
    }

    getById(id) {
        return this.categories.find(c => c.id === parseInt(id));
    }

    create(data) {
        const newCategory = {
            id: this.categories.length ? this.categories[this.categories.length - 1].id + 1 : 1,
            active: true,
            ...data
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id, changes) {
        const index = this.categories.findIndex(c => c.id == id);
        if (index === -1) throw new Error('Category Not Found');

        this.categories[index] = {
            ...this.categories[index],
            ...changes
        };
        return this.categories[index];
    }

    delete(id) {
        const index = this.categories.findIndex(c => c.id == id);
        if (index === -1) throw new Error('Category Not Found');

        const deleted = this.categories.splice(index, 1);
        return deleted[0];
    }
}

module.exports = CategoriesService;

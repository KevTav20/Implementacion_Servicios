const faker = require('faker');

class UsersService {
    constructor() {
        this.users = [];
        this.generate(10); // generar 10 usuarios al inicio
    }

    generate(limit = 10) {
        for (let index = 0; index < limit; index++) {
            this.users.push({
                id: index + 1,
                name: faker.name.firstName(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            });
        }
    }

    getAll() {
        return this.users;
    }

    getById(id) {
        return this.users.find(u => u.id === parseInt(id));
    }

    create(data) {
        const newUser = {
            id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
            ...data
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id, changes) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) throw new Error("User Not Found");

        this.users[index] = {
            ...this.users[index],
            ...changes
        };
        return this.users[index];
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) throw new Error("User Not Found");

        const deleted = this.users.splice(index, 1);
        return deleted[0];
    }
}

module.exports = UsersService;

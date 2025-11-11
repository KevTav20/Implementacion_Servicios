const User = require('../models/User');

class UsersService {
    async getAll() {
        return await User.find();
    }

    async getById(id) {
        const user = await User.findById(id);
        if (!user) throw new Error("User Not Found");
        return user;
    }

    async create(data) {
        const { name, username, password } = data;
        
        if (!name || !username || !password) {
            throw new Error("name, username y password son requeridos");
        }

        // Verificar si el username ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const newUser = new User({ name, username, password });
        return await newUser.save();
    }

    async update(id, changes) {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: changes },
            { new: true, runValidators: true }
        );
        
        if (!user) throw new Error("User Not Found");
        return user;
    }

    async updateFull(id, data) {
        const { name, username, password } = data;

        if (!name || !username || !password) {
            throw new Error("name, username y password son requeridos");
        }

        // Verificar si el username ya existe en otro usuario
        const existingUser = await User.findOne({ username, _id: { $ne: id } });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const updated = await User.findByIdAndUpdate(
            id,
            { name, username, password },
            { new: true, runValidators: true }
        );

        if (!updated) throw new Error("User Not Found");
        return updated;
    }

    async delete(id) {
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) throw new Error("User Not Found");
        return deleted;
    }
}

module.exports = UsersService;

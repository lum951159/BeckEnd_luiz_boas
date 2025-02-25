const User = require('./user');
const path = require('path');
const fs = require('fs')

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json')
        this.users = this.loadUsers();
        this.nextId = this.getNextId();
    }

    loadUsers() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath);
                return JSON.parse(data);
            }
        }
        catch (erro) {
            console.log('erro ao carregar arquivo', erro)
        }
        return [];

    }
    getNextId() {
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro) {
            console.log('erro ao buscar proximo Id', erro);
        }
    }
    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users))
        } catch (erro) {
            console.log('erro ao buscar proximo user', erro);
        }
    }

    addUser(nome, email, senha, endereço, telefone, cpf) {
        try {
            const user = new User(this.nextId++, nome, email, senha, endereço, telefone, cpf)
            this.users.push(user)
            this.saveUsers();
            return user
        } catch (erro) {
            console.log('erro ao adicionar user', erro)
        }
    }

    getUsers() {
        try {
            return this.users
        } catch (erro) {
            console.log('erro na função getUser', erro)
        }
    }

}

module.exports = new userService
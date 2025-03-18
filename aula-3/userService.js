const User = require('./user');
const path = require('path');
const fs = require('fs')

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json')
        this.users = this.loadUsers();
        this.nextId = this.getNextId();
    }

    loadUsers() { //carregar os usuarios do JSON (Banco)
        try { //tenta executar o bloco de codigo
            if (fs.existsSync(this.filePath)) { //verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); //le o arquivo
                return JSON.parse(data); //transforma o json em objeto
            }
        } catch (erro) { //caso ocorra um erro
            console.log('Erro ao carregar arquivo', erro);
        }
        return []; //retorna um array vazio
    }

    getNextId() {//função para buscar o proximo id
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;//retorna o maior id +1
        } catch (erro) {
            console.log('Erro ao buscar proximo id', erro);
        }
    }
    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users))
        } catch (erro) {
            console.log('erro ao buscar proximo user', erro);
        }
    }

    addUser(nome, email, senha, endereco, telefone, cfp) { //função para adicionar usuario
        try {
            const user = new User(this.nextId++, nome, email, senha, endereco, telefone, cfp); //cria um novo usuario
            this.users.push(user);//adiciona o usuario no array
            this.saveUsers();//salva o usuario
            return user;
        } catch (erro) {
            console.log('Erro ao adicionar usuario', erro);
        }
    }

    getUsers() {
        try {
            return this.users
        } catch (erro) {
            console.log('erro na função getUser', erro)
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();

        } catch {
            console.log('erro na função getUser', erro)
        }
    }

    putUser(id, nome, email, senha, endereço, telefone, cpf) {
        try {
            const index = this.users.findIndex(user => user.id === id);
            if (index === -1) {
                throw new Error('Usuário não encontrado');
            }
            this.users[index] = new User(id, nome, email, senha, endereço, telefone, cpf);
            this.saveUsers();
            return this.users[index];
        } catch (erro) {
            console.log('erro na função getUser', erro)
        }
    }


}


module.exports = new userService
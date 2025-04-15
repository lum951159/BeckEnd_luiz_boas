const User = require('./user');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require('./mysql'); // Importando o módulo mysql

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');
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

    getNextId() { //função para buscar o proximo id
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1; //retorna o maior id +1
        } catch (erro) {
            console.log('Erro ao buscar proximo id', erro);
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2));
        } catch (erro) {
            console.log('Erro ao salvar usuários', erro);
        }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf) { //função para adicionar usuario
        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const resultados = await mysql.execute(
                `INSERT INTO usuario (nome, email, senha, endereço, telefone, cpf)       
                     Values (?, ?, ?, ?, ?, ?)`,
                [nome, email, senhaCriptografada, endereco, telefone, cpf]

            );
            return resultados;

        } catch (erro) {
            console.log('Erro ao adicionar usuário', erro);
            throw erro;
        }
    }

    getUsers() {
        try {
            return this.users;
        } catch (erro) {
            console.log('Erro na função getUsers', erro);
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        } catch (erro) {
            console.log('Erro na função deleteUser', erro);
        }
    }

    async putUser(id, nome, email, senha, endereco, telefone, cpf) {
        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10);    
            const resultados = await mysql.execute(
                `UPDATE usuario
                    SET nome      = ?, 
                        email     = ?,
                        senha     = ?,
                        cpf       = ?,  
                        telefone  = ?,
                        endereço  = ?
                  WHERE IDusuario = ?;`,
                [nome, email, senhaCriptografada, cpf, telefone, endereco, id]);
            return resultados;
        } catch (erro) {
            console.log('Erro na função putUser', erro);

        }
    }
}

module.exports = new userService;

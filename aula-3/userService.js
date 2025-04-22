const User = require('./user');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const mysql = require('./mysql'); // Importando o módulo mysql

class userService {

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

    async getUsers() {
        try {
            const resultados = await mysql.execute(
                `SELECT  IDusuario FROM usuario WHERE IDusuario = ?`,
                [IDusuario]
            );
            return resultado;
        } catch (erro) {
            console.log('Erro ao buscar usuarios', erro);
        }
    }

    async deleteUser(id) {
        try {
            if (userService.length == 0) {
                console.log('Usuário não encontrado');
                return;
            }
            const deletar = await mysql.execute(
                `DELETE FROM usuario WHERE IDusuario = ?`,
                [id]
            );
            return resultado;
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

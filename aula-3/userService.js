const User = require('./user');
const path = require('path');
const fs = require('fs')
class userService{
    constuctor(){
        this.filePath = patch.join(__dirname, 'user.json')
        this.users = this.loadUsers();
        this.nextId = this.getNextId();
    }

    loadUsers(){
        try{  if(fs.existsSync(this.filePath)){
            const data = fs.readFileSync(this.filePath);
            return JSON.parse(data);
        }
    }
    catch (erro){
        console.log('erro ao carregar arquivo', erro)
    }
    return[];
      
    }
    getNextId(){
        try{
        if(this.users.length===0) return 1;
        return Math.max(...this.users.map(user => user.id))+1;
        } catch (erro) {
            console.log('erro ao buscar proximo', erro);
        }
    }
    saveUsers(){
        try{
            fs.writeFileSync(this.filePath, JSON.stringfy(this.users))
        }catch (erro) {
            console.log('erro ao buscar proximo', erro);
        }
    }

    addUser(nome, email){
        try{
        const user = new User(this.nextId++, nome, email)
        this.users.push(user)
        this.saveUsers();       
        return user
        }catch(erro){
            console.log('erro ao adicionar user', erro)
        }
    }

    getUsers(){
        try{
            return this.users
        }catch(erro){
            console.log('erro na função getUser', erro)
        }
    }

}

module.exports = new userService
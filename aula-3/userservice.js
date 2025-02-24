const User = require('./user');
const path = require('path');
const fs = require('fs')
class userService{
    constuctor(){
        this.filePath = patch.join(__dirname, 'user.json')
        this.users = []
        this.nextId = 1
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

    addUser(nome, email){
        const user = new User(this.nextId++, nome, email)
        this.users.push(user)
        return user
    }

    getUsers(){
        return this.users
    }

}

module.exports = new userService
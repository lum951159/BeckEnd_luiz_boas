const express = require ('express');
const userService = require ('./userService')

const app= express(); //nome qualquer para express
app.use(express.json()); //vou habilitar json no express

//rota para criar o usuario
app.post("/users", (req, res) =>{
    const {nome, email} = req.body;
    if(!nome || !email){
        return res.status(400).json
        ({error : "nome e email sao obrigatorios "})
    }

    const user = userService.addUser(nome, email);
    res.status(200).json({user});
})

//rota para lstar todos os usuarios 
app.get("./users", (req, res)=>{
    res.json(userService.getUsers());
})

const port = 3000;
app.listen(port, () => {
    console.log("Servidor rodando na", port)

})
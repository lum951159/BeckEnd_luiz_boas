const express = require('express');
const userService = require('./userService');

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
    const { nome, email, senha, endereço, telefone, cpf } = req.body;

    if (!nome || !email || !senha || !endereço || !telefone || !cpf) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const user = userService.addUser(nome, email, senha, endereço, telefone, cpf);
    res.status(200).json({ user });
});

app.get('/users', (req, res) => {
    res.json(userService.getUsers());
});

const port = 3000; // Corrigido

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});

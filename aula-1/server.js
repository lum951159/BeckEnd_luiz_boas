const express = require('express')

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('pagina inicial');
})

app.get('/home', (req, res) => {
    res.send('pagina home');
})

app.get('/login', (req, res) => {
    res.send('pagina login');
})



app.listen(port, () => {
    console.log('servidor rodando na porta', port)
})
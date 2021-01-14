const express = require ('express');
const path = require('path');
const fs = require("fs");

const app = express();

app.use(express.json({ extented: true }));
app.use(express.static('../admin'));

app.get('./api', async (req, res) => {
    try {
        const message = 'Test1';
        res.send(JSON.parse(message));
    } catch (e) {
        res.status(500).json( { message: 'Что-то пошло не так, попробуйте снова' })
    }
});
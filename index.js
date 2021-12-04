require('dotenv').config();

const express = require('express');

const path = require('path');

const routes = require('./src/routes');

const app = express();

const PORT = process.env.PORT;

app.set('views', path.resolve('src', 'views'));

app.set('view engine', 'ejs');

app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));
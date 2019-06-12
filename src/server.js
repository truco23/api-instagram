const express   = require('express');
const app       = express();
const consign   = require('consign');
const cors      = require('cors');
const bodyParser= require('body-parser');
const path      = require('path');
const port      = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

consign({ cwd: 'src' })
    .include('config')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app)

app.listen(port, () => {

    if(port == '3001') {
        console.log(`Servidor local rodando em ${ port }`);
        return;
    }

    console.log('Servidor remoto rodando');
});
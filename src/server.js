const express   = require('express');
const app       = express();
const consign   = require('consign');
const cors      = require('cors');
const bodyParser= require('body-parser');
const port      = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

consign({ cwd: 'src' })
    .include('config')
    .into(app)

app.listen(port, () => {

    if(port == '3001') {
        console.log(`Servidor local rodando em ${ port }`);
        return;
    }

    console.log('Servidor remoto rodando');
});
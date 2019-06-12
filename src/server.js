const express   = require('express');
const app       = express();
const consign   = require('consign');
const cors      = require('cors');
const bodyParser= require('body-parser');
const path      = require('path');
const server    = require('http').Server(app);
const io        = require('socket.io')(server);
const port      = process.env.PORT || 3001;

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

consign({ cwd: 'src' })
    .include('config')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app)

server.listen(port, () => {

    if(port == '3001') {
        console.log(`Servidor local rodando em ${ port }`);
        return;
    }

    console.log('Servidor remoto rodando');
});
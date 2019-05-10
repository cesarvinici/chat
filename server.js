const express = require('express');
const path = require('path')
const app = express();

// Cria protocolo http para tratar as requisições
const server = require('http').createServer(app)
// cria websocket para as requisições do socket.io
const io = require('socket.io')(server)
// Define a pasta public
app.use(express.static(path.join(__dirname, 'public')))
// Define onde vai ficar o html
app.set('views', path.join(__dirname, 'public'))
// Define nossa engine para poder utilizar html
app.engine('html', require('ejs').renderFile)
// usar html para as views
app.set('view engine', 'html')

app.use('/', (req, res) =>{
    res.render('index.html');
})

let messages = []

let online = 0;
io.on('connection', socket => {
    console.log(`Socket coneccted ${socket.id}`)

    socket.emit('previousMessage', messages);

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data);
    })
})



server.listen(3000)
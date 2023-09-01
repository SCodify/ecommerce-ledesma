const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')// Paso 1
const router = require('./router')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

app.set('view engine', 'handlebars')

router(app)

const httpServer = app.listen(port, () => {
    console.log(`Server runnig at port ${port}`);
})

const io = new Server(httpServer)// Paso 2 

io.on('connection', (socket) => {// Paso 5
    console.log("Hola desde el socket del lado del servidor, socket id: ", socket.id)

    // socket.on('mesagge', (payload) => {// Paso 7: se prueba recibir datos del lado del cliente
    //     console.log(payload, socket.id);
    // })
    
    socket.broadcast.emit(// Paso 9
        'broadcast',
        `Un mensaje para todos, menos para ${socket.id}`    
    )
})

//Paso 3 en views/products.handlebars
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
    console.log("hola desde el socket del lado del servidor")
})

//Paso 3 en views/products.handlebars
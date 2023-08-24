const express = require('express')
const handlebars = require('express-handlebars')//Paso 1

const router = require('./router')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Sirve para que todo lo que venga desde formulario pueda ser intepretado, para poder trabajarlo como objeto JS
app.use(express.static(__dirname + '/public'))// Paso 6 le damos la ruta de los archivos estáticos

app.engine('handlebars', handlebars.engine())// Paso 2 
app.set('views', __dirname + '/views')//Paso 3
// Paso 4 Creo el archivo src/views/layouts/main.handlebars
/*app.set('view engine', 'handlebars')*/ // Paso 5 (opcional) para no tener que estar colocando la extención en el .render del controler

router(app)

const httpServer = app.listen(port, () => {
    console.log(`Server runnig at port ${port}`);
})

const express = require('express')
const handlebars = require('express-handlebars')//Paso 1

const router = require('./router')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

/*app.set('view engine', 'handlebars')*/ // (opcional) para no tener que estar colocando la extención en el .render del controler

router(app)

const httpServer = app.listen(port, () => {
    console.log(`Server runnig at port ${port}`);
})

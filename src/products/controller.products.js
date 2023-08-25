const { Router } = require('express')
const products = require('../db/products')

//const ProductManager = require('../ProductManager')
//const productManager = new ProductManager("./miArchivo.txt");

const uploader = require('../utils/multer') // Sirve para cargar archivos

//console.log(products)

//console.log(products[products.length - 1].id + 1)

const router = Router()

router.get('/', async (req, res) =>{
    // const { limit } = req.body
    // res.json({message: products})
    res.render('products.handlebars', { 
        style: 'products' 
    })
})

router.get('/realtimeproducts', async (req, res) =>{
    // const { limit } = req.body
    //res.json({message: products})
    res.render('home.handlebars', {
        products,
        style: 'home'
    })
})

router.get('/:pid', async (req, res) =>{
    res.json({message: `product ${req.params.pid}`})
})

router.post('/', uploader.single('thumbnail') , async (req, res) =>{ //el uploader de multer sin con varios es .array y si es uno solo es .single, lo que va dentro de los parentesis es el nombre del atributo name que le pusimos a la etiqueta input de nuestro formulario html.
    try {       
        console.log(req.body)
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const productInfo = {
            id: (products[products.length - 1].id + 1) ,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail: req.body.thumbnail
        }
    
        products.push(productInfo)
        
        res.json({
            message: 'producto creado',
            productInfo
        })
    } catch (error) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
          })
    }
})

router.put('/:pdi', async (req, res) =>{
    console.log(req.body)
    res.json({message: `update product`})
})

router.delete('/:pid', async (req, res) =>{
    res.json({message: `delete product ${req.params.pid}`})
})

module.exports = router
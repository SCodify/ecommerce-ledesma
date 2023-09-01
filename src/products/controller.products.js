const { Router } = require('express')
const productsRouter = Router()

const ProductManager = require('../ProductManager')
const productManager = new ProductManager("./products.txt")

const uploader = require('../utils/multer') // Sirve para cargar archivos


productsRouter.get('/', async (req, res) =>{
    try {   
        const products = await productManager.getProducts()

        res.render('newproduct.handlebars', {
            products,
            style: 'newproducts'
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        })
    }
})

productsRouter.get('/realtimeproducts', async (req, res) =>{
    try {   
        // const { limit } = req.query
        // if(limit) {
        //     const productsLimit = await products.slice(0, limit)
        //     return res.render('home.handlebars', { 
        //         productsLimit,
        //         style: 'home' })
        // } 
        
        const products = await productManager.getProducts()
        
        res.render('productslist.handlebars', {
            products,
            style: 'productslist'
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        })
    }
})

productsRouter.get('/:pid', async (req, res) =>{
    try {
        const { pid } = req.params
        const product = await productManager.getProductById(pid)
        res.json({ product })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        })
    }
})

productsRouter.post('/', /*uploader.single('thumbnail'),*/ async (req, res) =>{ //el uploader de multer sin con varios es .array y si es uno solo es .single, lo que va dentro de los parentesis es el nombre del atributo name que le pusimos a la etiqueta input de nuestro formulario html.
    try {       
        const { title, description, code, price, status, stock, category/*, thumbnail*/ } = req.body
        
        await productManager.addProduct(
            title,
            description,
            code,
            price,
            status,
            stock,
            category/*,
            thumbnail*/
        )

        const products = await productManager.getProducts()
        
        const newProduct = products[products.length - 1]
        
        res.json({
            message: 'producto creado',
            newProduct
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
          })
    }
})

productsRouter.put('/:pid', async (req, res) =>{
    try {
        const { pid } = req.params
        const newData = req.body
        
        const updateProcut = await productManager.updateProduct(pid, newData)
        console.log(updateProcut);
        res.json({
            message: "Producto actualizado",
            updateProcut
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
          })
    }
})

productsRouter.delete('/:pid', async (req, res) =>{
    try {
        const { pid } = req.params
        
        const product = await productManager.deleteProduct(pid)
        res.json({
            message: "Producto eliminado",
            product
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
          })
    }
})

module.exports = productsRouter
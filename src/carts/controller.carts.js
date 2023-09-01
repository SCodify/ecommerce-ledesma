const fs = require('fs')

const { Router } = require('express')
const cartsRouter = Router()

const CartManager = require('../CartManager')
const cartManager = new CartManager("./carts.txt")

const importarProducto = async (pid) => {
  try {
      const contenido = await fs.promises.readFile('./products.txt', 'utf-8') 
      const arrProducts = JSON.parse(contenido)
      return arrProducts.find(product => product.id == pid)
  } catch (error) {
      console.log(error)
  }
}

cartsRouter.get('/realtimecarts', async (req, res) =>{
  try {   
      const carts = await cartManager.getCarts()
      
      res.render('cartslist.handlebars', {
          carts,
          style: 'cartslist'
      })
  } catch (err) {
      res.status(err.status || 500).json({
          message: err.message,
          error: err
      })
  }
})

cartsRouter.post('/', async (req, res) =>{
  try {
      console.log("Se ejecutó petición");       
      await cartManager.addCart()
      const carts = await cartManager.getCarts()
      
      const newCart = carts[carts.length - 1]
      
      res.json({
          message: 'Carrito creado',
          newCart
      })
  } catch (err) {
      res.status(err.status || 500).json({
          message: err.message,
          error: err
        })
  }
})

cartsRouter.post('/:cid/product/:pid', async (req, res) =>{
    try {
        const { cid } = req.params
        const { pid } = req.params 
        
        console.log('cid :',cid)
        
        console.log('pid :',pid)
        
        await cartManager.addProduct(cid, pid)
                
        res.json({
            message: 'Se agregó producto al carrito',
        })
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
          })
    }
  })

module.exports = cartsRouter
const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) =>{
    //res.json({message: `carts`})
    res.render('carts.handlebars', {
        style: 'carts'
    })
})

router.get('/:cid', async (req, res) =>{
    res.json({message: `cart ${req.params.cid}`})
})

router.post('/:cid/product/:pid', async (req, res) =>{
    console.log(req.body)
    res.json({message: `product ${req.params.pid} is added to cart ${req.params.cid}`})
})

module.exports = router
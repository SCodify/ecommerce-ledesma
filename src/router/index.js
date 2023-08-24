const productsControler = require('../products/controller.products')
const cartsControler = require('../carts/controller.carts')
//const HTTP_STATUS_CODE = require('../constants/errors.constants')

const router = (app) => {
    app.use('/api/products', productsControler)
    app.use('/api/carts', cartsControler)
    app.use('*', (req, res) => {
        //res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: 'Not found'})
        res.render('not_found', {
            style: 'not_found'
        })
    })
}

module.exports = router
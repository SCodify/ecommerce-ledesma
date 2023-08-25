const productsControler = require('../products/controller.products')
const cartsControler = require('../carts/controller.carts')
//const HTTP_STATUS_CODE = require('../constants/errors.constants')

const router = (app) => {
    app.use('/api/products', productsControler)
    app.use('/api/carts', cartsControler)
}

module.exports = router
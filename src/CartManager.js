const fs = require('fs')

class CartManager {
    
    cartId = 0
    
    constructor(ruta) {
        this.carts = []
        this.path = ruta
    }
    
    async addCart() {
        try {
            this.cartId ++

            const newCart = {
                id: this.cartId,
                products: [],
            }
            
            this.carts.push(newCart)
      
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
        } catch (error) {
            console.log(error);
        }
    } 

    async addProduct(cid, pid) {
        try {
            let arrCartsEditado = []

            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCarts = JSON.parse(contenido)
            
            console.log('arrCarts :',arrCarts)
            
            const cart = arrCarts.find(cart => cart.id == cid)

            if(cart.products.product == pid){
                cart.products.quantity ++
            } else {
                cart.products.push({ product: pid, quantity: 1})
            }
        } catch (error) {
            console.log(error);
        }
    } 
  
    async getCarts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            const contenido = await fs.promises.readFile(this.path, 'utf-8') 
            const arrCarts = JSON.parse(contenido)
            return arrCarts
        } catch (error) {
            console.log(error)
        }
    }
  
    async getCartById(pid) {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCarts = JSON.parse(contenido)
            const cart = arrCarts.find(product => product.id == pid)
            if (!cart) {
              throw new Error('Not found')
            }
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(idUpdate, obj) {
        try {
            let arrCartsEditado = []
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCarts = JSON.parse(contenido)
            
            arrCarts.forEach(cart => {
              if(cart.id == idUpdate){
                let cartMerge = {...cart, ...obj}
                arrCartsEditado.push(cartMerge)
              } else {
                arrCartsEditado.push(cart)
              }
            })
      
            await fs.promises.unlink(this.path)
      
            this.carts = arrCartsEditado
      
            await fs.promises.writeFile(this.path, JSON.stringify(arrCartsEditado))
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(idDelete) {
        try {
            let arrCartctsFiltrado = []
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCartcts = JSON.parse(contenido)
            
            arrCartctsFiltrado = arrCartcts.filter(cart => cart.id != idDelete) 
      
            await fs.promises.unlink(this.path)
      
            this.carts = arrCartsFiltrado
      
            await fs.promises.writeFile(this.path, JSON.stringify(arrCartsFiltrado))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartManager
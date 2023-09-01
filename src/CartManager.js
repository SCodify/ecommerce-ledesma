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

    async addProduct(cid, obj) {
        try {
            
            console.log('obj :',obj)
            

            let productoExiste = false

            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCarts = JSON.parse(contenido)
            
            
            arrCarts.forEach(cart => {
                if(cart.id == cid) {
                    if(cart.products.length == 0){
                        cart.products.push({id: obj.id, quantity: 1})
                    } else {
                        cart.products.forEach(product =>{
                            if(product.id == obj.id) {
                                product.quantity ++
                                productoExiste = true
                            }
                        })
                        
                        if(!productoExiste){
                            cart.products.push({id: obj.id, quantity: 1})
                        }
                    }
                }
            })

            this.carts = arrCarts
            
            console.log('arrCarts :',arrCarts)
            
            await fs.promises.writeFile(this.path, JSON.stringify(arrCarts))
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
  
    async getCartById(cid) {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCarts = JSON.parse(contenido)
            const cart = arrCarts.find(cart => cart.id == cid)
            if (!cart) {
              throw new Error('Not found')
            }
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCart(idDelete) {
        try {
            let arrCartsFiltrado = []
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrCartcts = JSON.parse(contenido)
            
            arrCartsFiltrado = arrCartcts.filter(cart => cart.id != idDelete) 
      
            await fs.promises.unlink(this.path)
      
            this.carts = arrCartsFiltrado
      
            await fs.promises.writeFile(this.path, JSON.stringify(arrCartsFiltrado))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartManager
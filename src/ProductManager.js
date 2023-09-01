const fs = require('fs')

class ProductManager {
    
    productId = 0
    
    constructor(ruta) {
        this.products = []
        this.path = ruta
    }
    
    async addProduct(title, description, code, price, status, stock, category/*, thumbnail*/) {
        try {
            this.productId ++

            const newProduct = {
                id: this.productId,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                /*thumbnail*/
            }
            
            if (!title || !description || !code || !price || !stock || !category/* || !thumbnail*/) {
                throw new Error('Todos los campos son obligatorios')
            }
            
            if (this.products.find(product => product.code === code)) {
                throw new Error('El código del producto ya está en uso')
            }    
            
            this.products.push(newProduct)
      
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log(error);
        }
    } 
  
    async getProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
            const contenido = await fs.promises.readFile(this.path, 'utf-8') 
            const arrProducts = JSON.parse(contenido)
            return arrProducts
        } catch (error) {
            console.log(error)
        }
    }
  
    async getProductById(pid) {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrProducts = JSON.parse(contenido)
            const product = arrProducts.find(product => product.id == pid)
            if (!product) {
              throw new Error('Not found')
            }
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(idUpdate, obj) {
        try {
            let arrProductsEditado = []
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrProducts = JSON.parse(contenido)
            
            arrProducts.forEach(product => {
              if(product.id == idUpdate){
                let productMerge = {...product, ...obj}
                arrProductsEditado.push(productMerge)
              } else {
                arrProductsEditado.push(product)
              }
            })
      
            await fs.promises.unlink(this.path)
      
            this.products = arrProductsEditado
      
            await fs.promises.writeFile(this.path, JSON.stringify(arrProductsEditado))
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(idDelete) {
        try {
            let arrProductsFiltrado = []
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            const arrProducts = JSON.parse(contenido)
            
            arrProductsFiltrado = arrProducts.filter(product => product.id != idDelete) 
      
            await fs.promises.unlink(this.path)
      
            this.products = arrProductsFiltrado
      
            await fs.promises.writeFile(this.path, JSON.stringify(arrProductsFiltrado))
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ProductManager
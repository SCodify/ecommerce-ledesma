const PORT = 8080

const viewProducts = () => {
    fetch(`http://localhost:${PORT}/api/products/realtimeproducts`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

viewProducts()
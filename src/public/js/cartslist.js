const PORT = 8080

const viewCarts = () => {
    fetch(`http://localhost:${PORT}/api/carts/realtimecarts`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

viewCarts()
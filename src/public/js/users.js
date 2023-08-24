const form = document.getElementById("createForm")

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => {
        obj[key] = value
    })

    fetch('/users', {
        headers:{
            'Content-Type': 'aplication/json', // Con esto digo que le mando información de tipo json a la direccion de users
        },
        method: "post", // Le especifico el método 
        body: JSON.stringify(obj) // Le mando el body y como tiene que ser de forma to JSON le hago un stringify
    })
    .then(response => response.json()) // Como la respuesta me llega en formato json la tengo que convertir a javascript
    .then(data => console.log(data)) // La data es la conversion de la respuesta a objeto de JavaScript
    .catch(error => console.error(error.message)) // Como la respuesta es simplemente un string solamente la muestro en pantalla
})

/*
// La siguiente función arma un objeto de forma dinamica:
data.forEach((value, key) => {
    obj[key] = value
}) 

// ya que pasa de esto:
data = [{nombre: "Fulano"}, {email: "nombre@email.com"}, {password: "asd1234"}]

// a esto:
obj = {
    name: "Fulano",
    email: "nombre@email.com",
    password: "asd1234"
}
*/
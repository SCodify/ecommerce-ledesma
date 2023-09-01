const socket = io()// Paso 4: con esto tenemos configurado el socket del lado del cliente

socket.on('broadcast', (data) => {//Paso 10
    console.log(data);
})

const form = document.getElementById("createForm")

form.addEventListener('submit', (event)=>{
    event.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => {
        obj[key] = value
    })

    
    //socket.emit('mesagge', obj)// Paso 8: se prueba enviar mensajes del lado del cliente

    fetch('/api/products', {
        headers:{
            'Content-Type': 'application/json', // Con esto digo que le mando información de tipo json a la direccion de users
        },
        method: "Post", // Le especifico el método 
        body: JSON.stringify(obj) // Le mando el body y como tiene que ser de forma to JSON le hago un stringify
    })
    .then(response => response.json()) // Como la respuesta me llega en formato json la tengo que convertir a javascript
    .then(data => console.log(data)) // La data es la conversion de la respuesta a objeto de JavaScript
    .catch(error => console.error(error.message)) // Como la respuesta es simplemente un string solamente la muestro en pantalla
})

// Paso 5 en src/app.js
const queryString = window.location.href;
const pathname = window.location.pathname.split('/');
console.log('href-->', queryString);
console.log('pathname-->', pathname[2]);
const id = pathname[2];


// obtener id
const url = 'http://localhost:4000/usuario/' + id
fetch(url)
    .then(response => response.json())
    .then(data => mostrarUsuario(data))
    .catch(error => console.log(error))


const mostrarUsuario = (data) => {
    console.log(data);
    let body = '';

    document.getElementById('inpNombre').value = data.nombre
    document.getElementById('inpApellido').value = data.apellido
    document.getElementById('inpCorreo').value = data.email
    document.getElementById('inpContrasenia').value = data.password
}


// funcion de edicion
const formElement = document.getElementById('editarUsuario');
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let nombreUsuario = document.getElementById("inpNombre").value;
    let apellidoUsuario = document.getElementById("inpApellido").value;
    let correoUsuario = document.getElementById("inpCorreo").value;
    let contraseniaUsuario = document.getElementById("inpContrasenia").value;

    let nuevoUsuario = { id: id, nombre: nombreUsuario, apellido: apellidoUsuario, email: correoUsuario, imagen: 'null', password: contraseniaUsuario };
    let nuevoUsuarioJson = JSON.stringify(nuevoUsuario);
    console.log('nuevoUsuarioJson: ' + nuevoUsuarioJson);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: nuevoUsuarioJson,
        redirect: 'follow'
    }).then((response) => response.json())
        .then((body) => {
            console.log(body)
        }).catch((error) => {
            console.error('error en la ejecucion', error);
        });
    window.location.href = 'http://localhost:4000/home';
});

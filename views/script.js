const formElement = document.getElementById('guardarNuevoUsuario');
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let nombreUsuario = document.getElementById("inpNombre").value;
    let apellidoUsuario = document.getElementById("inpApellido").value;
    let correoUsuario = document.getElementById("inpCorreo").value;
    let contraseniaUsuario = document.getElementById("inpContrasenia").value;

    let nuevoUsuario = { id: 0, nombre: nombreUsuario, apellido: apellidoUsuario, email: correoUsuario, imagen: 'null', password: contraseniaUsuario };
    let nuevoUsuarioJson = JSON.stringify(nuevoUsuario);
    console.log('nuevoUsuarioJson: ' + nuevoUsuarioJson);
    fetch('http://localhost:4000/usuario', {
        method: 'POST',
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
console.log('en index.js');
//get
fetch('http://localhost:4000/usuarios')
    .then(response => response.json())
    .then(data => mostrarUsuarios(data))
    .catch(error => console.log(error))


const mostrarUsuarios = (data) => {
    console.log(data);
    let body = '';
    for (let i = 0; i < data.length; i++) {
        body += `<tr><td>${data[i].id}</td><td>${data[i].nombre}</td><td>${data[i].apellido}</td><td>${data[i].email}</td><td>${data[i].password}</td>
        <td><button type="button" id="btnEditar" onclick="urlSend(${data[i].id})" class="btn btn-primary">Editar</button></td>
        <td><button type="button" id="btneliminar" onclick= "eliminarUsuario(${data[i].id})" class="btn btn-danger">Eliminar</button></td>
        </tr>`
    }
    document.getElementById('data').innerHTML = body;
}

function urlAgregar() {
    const urlPath = 'http://localhost:4000/nuevo_usuario'
    window.location.href = urlPath;

}
function urlSend(id) {
    const urlPath = 'http://localhost:4000/editar_usuario/' + id
    window.location.href = urlPath;

}

// funcion de eliminacion
function eliminarUsuario(id) {
    const url = 'http://localhost:4000/usuario/' + id
    let text = "Desea eliminar el usuario " + id + "?";
    if (confirm(text) == true) {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow'
        }).catch((error) => {
            console.error('error en la ejecucion', error);
        }); console.log('confirmado')
        window.location.reload();

    } else {
        text = "You canceled!";
        console.log('cancelado')

    }
}
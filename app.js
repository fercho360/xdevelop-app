const debug = require("debug")("app:inicio");
const express = require("express");
const Sequelize = require("sequelize");
const Joi = require("joi");
const config = require("config");
const morgan = require("morgan");
const path = require('path');
const app = express();

app.use(Sequelize);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));


app.listen('4000')

//configuracion de entornos o ambientes
console.log("aplicacion: " + config.get("nombre"));

//usando midelware de terceros nota: en la paguina de express podemos encontrar los midelwere de terceros
if (app.get("env") === "develpmen") {
    app.use(morgan("dev"));
    //console.log("morgan ablitado..")
    debug("morgan esta abilitado..");
}

//definimos los parametros de conexion a la base de datos(nombre_bd, usuario, password)
const sequelize = new Sequelize("node_usuarios", "root", "sasa1234", {
    host: "localhost",
    dialect: "mysql",
});

//definimos el modelo
const usuario = sequelize.define(
    "usuarios",
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: { type: Sequelize.DataTypes.STRING, llowNull: false },
        apellido: { type: Sequelize.DataTypes.STRING, llowNull: false },
        email: { type: Sequelize.DataTypes.STRING, llowNull: false },
        imagen: { type: Sequelize.DataTypes.STRING, llowNull: false },
        password: { type: Sequelize.DataTypes.STRING, llowNull: false },
    },
    { timestamps: false }
);

//conexion a la base de datos
sequelize
    .authenticate()
    .then(() => {
        console.log("conexion exitosa a la base de datos");
    })
    .catch((error) => {
        console.log("error en la conexion" + error);
    });
//trabajando con la BD
debug("conectando a la bd");

const getUsuarios = async (req, res) => {
    const usuarios = await usuario.findAll({
        attributes: ["id", "nombre", "apellido", "email", "imagen", "password"],
    });
    res.json(usuarios);
};

const getUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioById = await usuario.findByPk(id);
    res.json(usuarioById);
};

const postUsuario = async (req, res) => {
};

const putUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, imagen, password } = req.body;
    const usuarioById = await usuario.findByPk(id)
    usuarioById.nombre = nombre;
    usuarioById.apellido = apellido;
    usuarioById.email = email;
    usuarioById.imagen = imagen;
    usuarioById.password = password;
    await usuarioById.save()
    res.json(usuarioById);
};

const deleteUsuario = async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    await usuario.destroy({
        where: {
            id,
        },
    });
    res.sendStatus(204);
};
app.get("/home", (req, res) => {
    res.sendFile(__dirname +  '/views/index.html');
});
app.get("/nuevo_usuario", (req, res) => {
    res.sendFile(__dirname + '/views/form.html');
});
app.get("/editar_usuario/:id", (req, res) => {
    res.sendFile(__dirname +  '/views/editar_form.html');
});

app.get("/usuarios", getUsuarios);

app.post('/usuario', (req, res) => {
    let usuarioPost = req.body
    usuario.create(usuarioPost);
    res.json(usuarioPost);
});

app.put("/usuario/:id", putUsuario);
app.delete("/usuario/:id", deleteUsuario);
app.get("/usuario/:id", getUsuario);
app.get("/editar_usuario/:id", (req, res) => {
    res.sendFile(__dirname +  '/views/form.html');
});
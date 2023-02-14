# xdevelop-app
App de gestion de usuarios para XDEVELOP


ejecute  npm install  para instalar  las dependencias con las que funciona la app.

ejecutar npm start para inicar la aplicacion.

ruta  de inicio http://localhost:4000/home

la conexion esta  realiza con  bd nysql en local con las siguientes consultas:

CREATE SCHEMA `node_usuarios`;
USE node_usuarios;
CREATE TABLE `node_usuarios`.`usuarios ` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(25) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `imagen` VARCHAR(45) NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));




#by Fernando Vazquez


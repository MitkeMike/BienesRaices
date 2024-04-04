import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config({path: '.env'});
// config.js
const db = new Sequelize(process.env.BD_NOMBRE, process.env.DB_USER, process.env.DB_PASS ?? '', {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    define: {
        timestamps: true,
    },
    pool: {
        max: 5, // maximo de conexiones
        min: 0, // minimo de conexiones
        acquire: 30000, // tiempo de adquisicion
        idle: 10000, // tiempo de inactividad
    },
    operatorsAliases: false // para que no muestre advertencias
});

export default db;
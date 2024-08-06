const mysql= require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tareasHogar'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
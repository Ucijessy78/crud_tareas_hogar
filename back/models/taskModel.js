const db = require('../config/database');
db.query = require('util').promisify(db.query);
const Task = {
    getAll: (callback) => {
        const query = 'SELECT * FROM tareas';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM tareas WHERE id =?';
        db.query(query, [id], callback);
    },

    create: (task, callback) => {
        const query = 'INSERT INTO tareas (title, description, status) VALUES (?,?,?)';
        db.query(query, [task.title, task.description, task.status], callback);
    },

    update: async (task, callback) => {
        try {
            const query = 'UPDATE tareas SET title = ?, description = ?, status = ? WHERE id = ?';
            // Ejecuta la consulta usando await y desestructura el resultado
            const [result] = await db.query(query, [task.title, task.description, task.status, task.id]);
            // Llama al callback con null como error y el resultado de la consulta
            callback(null, result);
        } catch (error) {
            // Llama al callback con el error en caso de fallo
            callback(error);
        }
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM tareas WHERE id=?';
        db.query(query, [id], callback);
    },

}

module.exports = Task;
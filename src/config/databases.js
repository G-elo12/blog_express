import mysql from 'mysql2/promise';

const databases = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'baketaso5',
    database: 'mi_blog',
});

export { databases };

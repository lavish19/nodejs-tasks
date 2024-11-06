// knexfile.js
module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'root',         // Use your MySQL username
        password: 'password', // Use your MySQL password
        database: 'your_database_name' // Your database name
      }
    }
  };
  
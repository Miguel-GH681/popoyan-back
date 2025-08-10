const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.SERVER_PORT || 3000;

sequelize.authenticate()
    .then(()=>{
        console.log('Connection to PostgreSQL established successfully.');
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}.`);  
        });
    })
    .catch(error =>{
        console.error('Could not connect to the database:', error);
    });
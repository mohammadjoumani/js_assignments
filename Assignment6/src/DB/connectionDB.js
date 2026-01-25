import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("blog_app", 'root', "root", {
    host: "127.0.0.1",
    port: "8889",
    dialect: "mysql",
});


 export const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

 export const checkSYncDB = async () => {
    try {
        await sequelize.sync({alter: true, force: false});
        console.log('Sync has been established successfully.');
    } catch (error) {
        console.error('Unable to sync to the database:', error);
    }
}
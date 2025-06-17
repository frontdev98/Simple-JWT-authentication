// default application port that the app listening to
export const PORT = 5000;

// default postgres parameters;
// If postgreSQL doesn't have user, create it:
// 1. open terminal and log in with default user "postgres";
// 2. CREATE USER userName WITH PASSWORD 'yourPassword' LOGIN;
// 3. CREATE DATABASE userName WITH OWNER=userName;
export const databaseParameters = {
    host: '',
    port: undefined,
    user: '',
    password: ''
};
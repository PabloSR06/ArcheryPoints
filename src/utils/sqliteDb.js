import { enablePromise, openDatabase } from "react-native-sqlite-storage";

enablePromise(true);

const DATABASE_NAME = "MyApp.db";

export async function getDbConnection() {
    const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
    return db;
}
export async function createTables(db) {
    const query = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,id_ext TEXT)';
    return db.executeSql(query);
}
export async function initDatabase() {
    const db = await  getDbConnection();
    await createTables(db);
    console.log('Database initialized');
    db.close();
}
export async function insertUser(db, user) {
    const query = 'INSERT INTO users (name,id_ext) VALUES (?,?)';
    const params = [user.name, user.id_ext];
    return db.executeSql(query, params);
}
export async function getUsers(db) {
    const query = 'SELECT * FROM users';
    const result = await db.executeSql(query);
    const users = result[0].rows.raw();
    return users;
}
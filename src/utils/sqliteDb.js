import { enablePromise, openDatabase } from "react-native-sqlite-storage";

enablePromise(true);

const DATABASE_NAME = "MyApp.db";

export async function getDbConnection() {
    const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
    return db;
}
export async function createTables(db) {
    const query = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,id_ext TEXT, isOwner boolean DEFAULT false)';
    //const query = 'DROP TABLE users;';
    return db.executeSql(query);
}
export async function initDatabase() {
    const db = await getDbConnection();
    await createTables(db);
    console.log('Database initialized');
    db.close();
}
export async function insertUser(user) {
    const db = await getDbConnection();
    const query = 'INSERT INTO users (name,id_ext) VALUES (?,?)';
    const params = [user.name, user.id_ext];
    return db.executeSql(query, params);
}
export async function insertProfile(user) {
    const db = await getDbConnection();
    const query = 'INSERT INTO users (name,id_ext,isOwner) VALUES (?,?,true)';
    const params = [user.name, user.id_ext];
    return db.executeSql(query, params);
}
export async function deleteUser(userId) {
    const db = await getDbConnection();
    const query = 'DELETE FROM users WHERE id = ?';
    const params = [userId];
    return db.executeSql(query, params);
}
export async function editUser(user) {
    const db = await getDbConnection();
    const query = 'UPDATE users SET name = ?, id_ext = ? WHERE id = ?';
    const params = [user.name, user.extId,user.id];
    return db.executeSql(query, params);
}
export async function getAllUsers() {
    const db = await getDbConnection();
    const query = 'SELECT * FROM users';
    const result = await db.executeSql(query);
    const users = result[0].rows.raw();
    return users;
}
export async function getOwnerUser() {
    const db = await getDbConnection();
    const query = 'SELECT * FROM users where isOwner = true';
    const result = await db.executeSql(query);
    const users = result[0].rows.raw();
    return users;
}
export async function getExtUsers() {
    const db = await getDbConnection();
    const query = 'SELECT * FROM users where isOwner = false';
    const result = await db.executeSql(query);
    const users = result[0].rows.raw();
    return users;
}
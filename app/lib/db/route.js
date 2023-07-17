import mysql from "mysql2/promise"

// db connection na triny ko and di nagana nalabas itong error
// - error Detected default export in 'C:\hugebites\app\api\admin\account\route.js'. 
// Export a named export for each HTTP method instead.
// - error Detected default export in 'C:\hugebites\app\api\admin\account\route.js'. 
// Export a named export for each HTTP method instead.
// hinahanap niya yung GET, POST, PUT, etc. na name sa method

export default async function query( { query, values = [] }) {
    const connection = await mysql.createConnection({
        host:"localhost", 
        database: "my_database",
        user: "root",
    });

    try{
        const [results] = await dbconnection.execute(query, values);
        connection.end();
        return results;
    } catch(error) {
        throw Error(error.message);
        return error;  
    }
}
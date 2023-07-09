import mysql from 'mysql2/promise';

export default async function handler(req, res) {

    const connection = await mysql.createConnection({
        host:"localhost", 
        database: "my_database",
        user: "root",
    });
    try {
        const query = "SELECT * FROM tbl_user";
        const values = [];
        const data = await connection.execute(query, values);
        connection.end();
        console.log(data);
        console.log(res);

        res.status(200).json({ results: data });
        
        console.log("napasok sa try");
        } catch(error) {
        console.log(error)
        console.log("pumapasok sa error");
    }
}
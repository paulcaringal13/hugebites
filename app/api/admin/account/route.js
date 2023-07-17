import mysql from 'mysql2/promise';
// import { query } from "../../../lib/db"
import { NextRequest, NextResponse } from "next/server";


async function con() {
  const connection = await mysql.createConnection({
    host:"localhost", 
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export async function GET() {
    const connection = await con();

    const query = "SELECT * FROM accounts";
    const results = await connection.execute(query, []);
    connection.end();

  return NextResponse.json({ results: results[0] });
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { firstName, lastName } = reqBody;

    const query = `INSERT INTO accounts (firstName, lastName) VALUES ('${firstName}', '${lastName}')`;
    const results = await connection.execute(query);
    connection.end();
    // results: results[0] 

    console.log("reqBody:", reqBody);
    return NextResponse.json({results
    });
  } catch(error) {
    console.log(error);
  }
}


// ginamit ko para sana maiseperate ang db connection sa method POST, GET...
// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const accounts = await query({
//       query: "SELECT * FROM accounts",
//       values: [],
//     });
//     res.status(200).json({ accounts : accounts });
//   }
// }
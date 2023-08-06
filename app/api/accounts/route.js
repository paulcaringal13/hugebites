import mysql from "mysql2/promise";
// import { query } from "../../../lib/db"
import { NextRequest, NextResponse } from "next/server";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
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
  const connection = await con();

  const reqBody = await req.json();

  const { email, password } = reqBody;

  const query = `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`;
  const results = await connection.execute(query, []);
  connection.end();

  const user = results[0];
  // { results:}
  console.log(results[0]);
  return NextResponse.json(user);
}

// export async function POST(req, res) {
//   try {
//     const connection = await con();

//     const reqBody = await req.json();
//     const { firstName, lastName, email, password, age, contact, accountType } =
//       reqBody;

//     const query = `INSERT INTO accounts (firstName, lastName, email, password, age, contact, accountType ) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${age}', '${contact}', '${accountType}')`;
//     const results = await connection.execute(query);
//     connection.end();
//     // results: results[0]

//     console.log("reqBody:", reqBody);
//     return NextResponse.json({ results });
//   } catch (error) {
//     console.log(error);
//   }
// }

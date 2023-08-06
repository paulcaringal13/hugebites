import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

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

  const query = `SELECT * FROM ordered_products`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  console.log(results);

  return NextResponse.json({ results });
}

// export async function POST(req, res) {
//   try {
//     const connection = await con();

//     const reqBody = await req.json();

//     const { accountId } = reqBody;
//     const query = `INSERT INTO cart (accountId) VALUES ('${accountId}')`;
//     const results = await connection.execute(query);
//     connection.end();

//     console.log("results====>", results);
//     return NextResponse.json(results);
//   } catch (error) {
//     console.log(error);
//   }
// }

import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

// CUSTOMER

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
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { firstName, lastName, email, password, age, contact } = reqBody;

    const query = `INSERT INTO accounts (firstName, lastName, email, password, age, contact, accountType ) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${age}', '${contact}', 'Customer')`;
    const results = await connection.execute(query);
    connection.end();
    // results: results[0]

    console.log("reqBody:", reqBody);
    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

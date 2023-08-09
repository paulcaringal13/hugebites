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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const query = `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`; // change accountID
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];
  console.log(results);

  return NextResponse.json(results);
}

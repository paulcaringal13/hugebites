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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");

  const query = `SELECT username FROM accounts WHERE username = '${username}'`;
  const results = await connection.execute(query);

  let data = results[0][0];

  {
    !data ? (data = "Success") : (data = results[0][0].username);
  }

  connection.end();

  return NextResponse.json(data);
}

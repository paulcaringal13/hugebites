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

  const contact = searchParams.get("contact");

  const query = `SELECT contact FROM accounts WHERE contact = '${contact}'`;
  const results = await connection.execute(query);

  console.log(results);
  let data = results[0][0];

  {
    !data ? (data = "Success") : (data = results[0][0].contact);
  }

  connection.end();

  return NextResponse.json(data);
}

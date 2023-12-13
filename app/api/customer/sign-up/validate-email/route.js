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

export const dynamic = "force-dynamic";

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);

  const emailAdd = searchParams.get("email");

  const query = `SELECT email FROM accounts WHERE email = '${emailAdd}'`;
  const results = await connection.execute(query);

  let data = results[0][0];

  {
    !data ? (data = "Success") : (data = results[0][0].email);
  }

  console.log(data);
  connection.end();

  return NextResponse.json(data);
}

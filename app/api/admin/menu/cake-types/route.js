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

  const query = `SELECT * FROM menu`;
  const results = await connection.execute(query);
  connection.end();

  console.log(results);

  return NextResponse.json({ results: results });
}

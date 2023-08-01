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

  const query = `SELECT * FROM customization_shape`;
  const results = await connection.execute(query);
  connection.end();

  console.log(results[0]);

  return NextResponse.json({ results: results[0] });
}

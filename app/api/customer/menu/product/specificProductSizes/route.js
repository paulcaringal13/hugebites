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
  const productId = searchParams.get("productId");

  const query = `SELECT * FROM customization_packaging WHERE productId = ${productId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

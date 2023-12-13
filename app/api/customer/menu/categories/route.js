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
export async function GET(request, path) {
  const connection = await con();

  const query = `SELECT * FROM product_categories`;
  const results = await connection.execute(query);
  connection.end();

  const data = results[0];

  return NextResponse.json(data);
}

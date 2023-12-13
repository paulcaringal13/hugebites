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

export async function PUT(req, path) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { productId } = reqBody;

    const query = `UPDATE products SET isRemoved = 1, status = 'Unavailable' WHERE productId = ${productId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

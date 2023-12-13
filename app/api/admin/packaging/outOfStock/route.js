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

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { isOutOfStock, packagingId } = reqBody;

  const query = `UPDATE packaging SET isOutOfStock ='${isOutOfStock}' WHERE packagingId = ${packagingId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

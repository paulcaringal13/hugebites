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

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { packagingId, quantity } = reqBody;

  const query = `INSERT INTO inventory_packaging (packagingId, quantity) VALUES ('${packagingId}', '${quantity}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { stockId, packagingId, quantity } = reqBody;

  const query = `UPDATE inventory_packaging SET packagingId = '${packagingId}', quantity = '${quantity}' WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

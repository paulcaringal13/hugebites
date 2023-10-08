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

export async function GET() {
  const connection = await con();

  const query = `SELECT inventory_packaging.stockId, inventory_packaging.packagingId, inventory_packaging.quantity, packaging.packagingName, packaging.size FROM inventory_packaging LEFT JOIN packaging ON inventory_packaging.packagingId = packaging.packagingId`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

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
  const { quantity, stockId } = reqBody;

  const query = `UPDATE inventory_packaging SET quantity ='${quantity}' WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { stockId } = reqBody;

  const query = `DELETE FROM inventory_packaging WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

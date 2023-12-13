import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const connection = await con();

  const query = `SELECT packaging.packagingName, packaging_waste.quantity, packaging_waste.stockId, packaging_waste.wasteDate FROM packaging_waste LEFT JOIN packaging ON packaging.packagingId = packaging_waste.packagingId`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { packagingId, quantity, wasteDate, stockId } = reqBody;

  const query = `INSERT INTO packaging_waste (packagingId, quantity, wasteDate, stockId) VALUES ('${packagingId}', '${quantity}','${wasteDate}', '${stockId}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { stockId } = reqBody;

  const query = `DELETE FROM packaging_waste WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

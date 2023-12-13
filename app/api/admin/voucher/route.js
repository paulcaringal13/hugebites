import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

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

  const query = "SELECT * FROM vouchers";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { voucherName, discount } = reqBody;

  const query = `INSERT INTO vouchers (voucherName, discount) VALUES ('${voucherName}', '${discount}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { voucherId } = reqBody;

  const query = `DELETE FROM vouchers WHERE voucherId = ${voucherId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

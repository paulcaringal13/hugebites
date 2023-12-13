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

export async function GET() {
  const connection = await con();

  const query = `SELECT * FROM packaging`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { packagingName, size } = reqBody;

  const query = `INSERT INTO packaging (packagingName, size) VALUES ('${packagingName}', '${size}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { packagingId } = reqBody;

  const query = `DELETE FROM packaging WHERE packagingId = ${packagingId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

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

  const query = `SELECT * FROM ingredients`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { ingredientName, unit } = reqBody;

  const query = `INSERT INTO ingredients (ingredientName, unit) VALUES ('${ingredientName}', '${unit}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { totalQuantity, ingredientId } = reqBody;

  const query = `UPDATE ingredients SET totalQuantity ='${totalQuantity}' WHERE ingredientId = ${ingredientId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { ingredientId } = reqBody;

  const query = `DELETE FROM ingredients WHERE ingredientId = ${ingredientId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

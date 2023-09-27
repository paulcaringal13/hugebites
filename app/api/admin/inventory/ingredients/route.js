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

  const query = `SELECT * FROM inventory_raw_ingredients`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  //   console.log(results);

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { quantity, ingredientId } = reqBody;

  console.log(quantity);

  const query = `UPDATE inventory_raw_ingredients SET quantity ='${quantity}' WHERE ingredientId = ${ingredientId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

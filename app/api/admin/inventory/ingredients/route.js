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

  const query = `SELECT inventory_ingredients.stockId, inventory_ingredients.ingredientId, inventory_ingredients.quantity, inventory_ingredients.purchaseDate, inventory_ingredients.expirationDate, inventory_ingredients.isExpired, ingredients.ingredientName, ingredients.unit FROM inventory_ingredients LEFT JOIN ingredients ON inventory_ingredients.ingredientId = ingredients.ingredientId`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { ingredientId, quantity, purchaseDate, expirationDate, isExpired } =
    reqBody;

  const query = `INSERT INTO inventory_ingredients (ingredientId, quantity, purchaseDate, expirationDate, isExpired) VALUES ('${ingredientId}', '${quantity}', '${purchaseDate}', '${expirationDate}', '${isExpired}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { quantity, stockId } = reqBody;

  const query = `UPDATE inventory_ingredients SET quantity ='${quantity}' WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { stockId } = reqBody;

  const query = `DELETE FROM inventory_ingredients WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

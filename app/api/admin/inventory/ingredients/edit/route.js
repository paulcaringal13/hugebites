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
  const { ingredientId, quantity, purchaseDate, expirationDate, isExpired } =
    reqBody;

  const query = `INSERT INTO inventory_ingredients (ingredientId, quantity, purchaseDate, expirationDate, isExpired) VALUES ('${ingredientId}', '${quantity}','${purchaseDate}', '${expirationDate}', '${isExpired}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { stockId, ingredientId, quantity, purchaseDate, expirationDate } =
    reqBody;

  const query = `UPDATE inventory_ingredients SET ingredientId = '${ingredientId}', quantity = '${quantity}', purchaseDate = '${purchaseDate}', expirationDate = '${expirationDate}' WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

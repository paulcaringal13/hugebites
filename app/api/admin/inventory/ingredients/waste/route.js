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

  const query = `SELECT ingredients.ingredientName, ingredient_waste.quantity, ingredient_waste.stockId, ingredient_waste.wasteDate FROM ingredient_waste LEFT JOIN ingredients ON ingredients.ingredientId = ingredient_waste.ingredientId`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { ingredientId, quantity, wasteDate, stockId } = reqBody;

  const query = `INSERT INTO ingredient_waste (ingredientId, quantity, wasteDate, stockId) VALUES ('${ingredientId}', '${quantity}','${wasteDate}', '${stockId}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { stockId } = reqBody;

  const query = `DELETE FROM ingredient_waste WHERE stockId = ${stockId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

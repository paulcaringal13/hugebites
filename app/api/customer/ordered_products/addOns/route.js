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

export async function GET(request) {
  try {
    const connection = await con();

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    const query = `SELECT * FROM ordered_products_addons WHERE orderId = ${orderId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const {
    orderedProductId,
    orderId,
    specialPropertyId,
    addOnsId,
    addOnsQuantity,
    addOnsTotal,
  } = reqBody;
  try {
    let query;

    !specialPropertyId
      ? (query = `INSERT INTO ordered_products_addons (orderedProductId, orderId,  addOnsId, addOnsQuantity, addOnsTotal ) VALUES ('${orderedProductId}', '${orderId}',  '${addOnsId}', '${addOnsQuantity}', '${addOnsTotal}')`)
      : (query = `INSERT INTO ordered_products_addons (orderedProductId, orderId, specialPropertyId, addOnsId, addOnsQuantity, addOnsTotal ) VALUES ('${orderedProductId}', '${orderId}', '${specialPropertyId}', '${addOnsId}', '${addOnsQuantity}', '${addOnsTotal}')`);

    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

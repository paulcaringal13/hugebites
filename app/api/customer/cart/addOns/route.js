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

export async function GET(request) {
  try {
    const connection = await con();

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    const query = `SELECT * FROM cart_addons WHERE customerId = ${customerId}`;
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
    cartId,
    cartSpecialPropertyId,
    addOnsId,
    addOnsQuantity,
    addOnsTotal,
    customerId,
  } = reqBody;

  try {
    let query;

    cartSpecialPropertyId == 0
      ? (query = `INSERT INTO cart_addons (cartId, addOnsId, customerId, addOnsQuantity, addOnsTotal ) VALUES ('${cartId}', '${addOnsId}',  '${customerId}', '${addOnsQuantity}', '${addOnsTotal}')`)
      : (query = `INSERT INTO cart_addons (cartId, addOnsId, cartSpecialPropertyId, customerId, addOnsQuantity, addOnsTotal ) VALUES ('${cartId}', '${addOnsId}', '${cartSpecialPropertyId}', '${customerId}', '${addOnsQuantity}', '${addOnsTotal}')`);

    const results = await connection.execute(query);
    console.log(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

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
    const orderId = searchParams.get("orderId");

    const query = `SELECT * FROM special_products_property WHERE orderId = ${orderId}`;
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
    customerId,
    orderId,
    orderedProductId,
    specialPropertyName,
    specialPropertyValue,
  } = reqBody;
  try {
    const query = `INSERT INTO special_products_property (customerId, orderId, orderedProductId, specialPropertyName, specialPropertyValue  ) VALUES ('${customerId}', '${orderId}', '${orderedProductId}', '${specialPropertyName}', '${specialPropertyValue}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

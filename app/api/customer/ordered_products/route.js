import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

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
    const customerId = searchParams.get("customerId");

    const query = `SELECT * FROM ordered_products WHERE customerId = ${customerId}`;
    const res = await connection.execute(query);
    connection.end();

    const results = res[0];

    return NextResponse.json(results);
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();

    const {
      customerId,
      orderId,
      productId,
      packagingId,
      flavorId,
      shapeId,
      quantity,
      colorId,
      subTotal,
      message,
      isCakeCustomized,
      imageReference,
    } = reqBody;
    const query = `INSERT INTO ordered_products (customerId, isCakeCustomized, orderId, productId, packagingId, flavorId ${
      !shapeId ? "," : ",shapeId,"
    } quantity, colorId,subTotal, message, imageReference) VALUES ('${customerId}', '${isCakeCustomized}', '${orderId}', '${productId}','${packagingId}','${flavorId}' ${
      !shapeId ? "," : `,'${shapeId}',`
    } '${quantity}','${colorId}','${subTotal}','${message}', '${imageReference}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

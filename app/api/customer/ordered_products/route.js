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
    const accountId = searchParams.get("accountId");

    const query = `SELECT * FROM cart WHERE accountId = ${accountId}`; // change accountID
    const res = await connection.execute(query);
    connection.end();

    const results = res[0];

    console.log(results);

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
      accountId,
      orderId,
      productId,
      packagingId,
      flavorId,
      drageesId,
      shapeId,
      quantity,
      darkColoredBaseId,
      freshFlowerId,
      subTotal,
    } = reqBody;
    const query = `INSERT INTO ordered_products (accountId, orderId, productId, packagingId, flavorId, drageesId, shapeId, quantity, darkColoredBaseId, freshFlowerId, subTotal) VALUES ('${accountId}', '${orderId}', '${productId}','${packagingId}','${flavorId}','${drageesId}','${shapeId}','${quantity}','${darkColoredBaseId}','${freshFlowerId}','${subTotal}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

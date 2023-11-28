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

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { productId, flavorId, shapeId, packagingId, colorId, default_total } =
    reqBody;

  const query = `INSERT INTO default_products ( productId, flavorId, shapeId, packagingId, colorId, default_total) VALUES ('${productId}', '${flavorId}', '${shapeId}', '${packagingId}', '${colorId}', '${default_total}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { defaultProductId, flavorId, shapeId, colorId, default_total } =
      reqBody;

    const query = `UPDATE default_products SET flavorId ='${flavorId}', shapeId ='${shapeId}', colorId='${colorId}', default_total='${default_total}' WHERE defaultProductId = ${defaultProductId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

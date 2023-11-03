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

export async function GET() {
  const connection = await con();

  const query = `SELECT customization_packaging.productId, customization_packaging.packagingStatus, customization_packaging.isSizeRemoved, customization_packaging.packagingId, customization_packaging.packagingPrice, customization_packaging.size, products.productName FROM customization_packaging LEFT JOIN products ON products.productId = customization_packaging.productId`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { size, packagingPrice, productId, packagingStatus } = reqBody;
  try {
    const query = `INSERT INTO customization_packaging (size, packagingPrice, productId, packagingStatus) VALUES ('${size}', '${packagingPrice}', '${productId}', '${packagingStatus}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { packagingId, productId, packagingPrice, packagingStatus, size } =
      reqBody;

    const query = `UPDATE customization_packaging SET productId ='${productId}',packagingStatus ='${packagingStatus}', packagingPrice='${packagingPrice}', size='${size}' WHERE packagingId = ${packagingId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

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
export const dynamic = "force-dynamic";

export async function GET() {
  const connection = await con();

  const query = `SELECT customization_packaging.productId, customization_packaging.sizeDescription, customization_packaging.packagingStatus, customization_packaging.isSizeRemoved, customization_packaging.packagingId, customization_packaging.packagingPrice, customization_packaging.size, products.productName FROM customization_packaging LEFT JOIN products ON products.productId = customization_packaging.productId ORDER BY 
  customization_packaging.packagingId DESC;`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();

  const { size, packagingPrice, productId, packagingStatus, sizeDescription } =
    reqBody;
  try {
    const query = `INSERT INTO customization_packaging (size, packagingPrice, productId, packagingStatus, sizeDescription) VALUES ('${size}', '${packagingPrice}', '${productId}', '${packagingStatus}', '${sizeDescription}')`;
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
    const {
      packagingId,
      productId,
      packagingPrice,
      packagingStatus,
      size,
      sizeDescription,
    } = reqBody;

    const query = `UPDATE customization_packaging SET productId ='${productId}',packagingStatus ='${packagingStatus}', packagingPrice='${packagingPrice}', size='${size}', sizeDescription='${sizeDescription}' WHERE packagingId = ${packagingId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

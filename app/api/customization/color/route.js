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

  const query = `SELECT * FROM customization_color`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { colorName, colorPrice, colorStatus } = reqBody;
  try {
    const query = `INSERT INTO customization_color (colorName, colorPrice, colorStatus) VALUES ('${colorName}', '${colorPrice}',  '${colorStatus}')`;
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
    const { colorId, colorPrice, colorStatus, colorName } = reqBody;

    const query = `UPDATE customization_color SET colorStatus ='${colorStatus}', colorPrice='${colorPrice}', colorName='${colorName}' WHERE colorId = ${colorId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

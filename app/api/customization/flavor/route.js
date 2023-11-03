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

  const query = `SELECT * FROM customization_flavor`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { flavorName, flavorPrice, flavorStatus, flavorDescription } = reqBody;
  try {
    const query = `INSERT INTO customization_flavor (flavorName, flavorPrice, flavorStatus, flavorDescription) VALUES ('${flavorName}', '${flavorPrice}',  '${flavorStatus}', '${flavorDescription}')`;
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
      flavorId,
      flavorPrice,
      flavorStatus,
      flavorName,
      flavorDescription,
    } = reqBody;

    const query = `UPDATE customization_flavor SET flavorStatus ='${flavorStatus}', flavorPrice='${flavorPrice}', flavorName='${flavorName}', flavorDescription='${flavorDescription}' WHERE flavorId = ${flavorId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

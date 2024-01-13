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

  const query = `SELECT * FROM customization_addons ORDER BY customization_addons.addOnsId DESC`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { addOnsName, addOnsPrice, addOnsStatus, addOnsDescription } = reqBody;
  try {
    const query = `INSERT INTO customization_addons (addOnsName, addOnsPrice, addOnsStatus, addOnsDescription) VALUES ('${addOnsName}', '${addOnsPrice}',  '${addOnsStatus}',  '${addOnsDescription}')`;
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
      addOnsId,
      addOnsPrice,
      addOnsStatus,
      addOnsName,
      addOnsDescription,
    } = reqBody;

    const query = `UPDATE customization_addons SET addOnsStatus ='${addOnsStatus}', addOnsPrice='${addOnsPrice}', addOnsName='${addOnsName}', addOnsDescription='${addOnsDescription}' WHERE addOnsId = ${addOnsId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

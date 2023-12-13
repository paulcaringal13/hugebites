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

  const query = `SELECT * FROM customization_addons`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { addOnsName, addOnsPrice, addOnsStatus } = reqBody;
  try {
    const query = `INSERT INTO customization_addons (addOnsName, addOnsPrice, addOnsStatus) VALUES ('${addOnsName}', '${addOnsPrice}',  '${addOnsStatus}')`;
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
    const { addOnsId, addOnsPrice, addOnsStatus, addOnsName } = reqBody;

    const query = `UPDATE customization_addons SET addOnsStatus ='${addOnsStatus}', addOnsPrice='${addOnsPrice}', addOnsName='${addOnsName}' WHERE addOnsId = ${addOnsId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

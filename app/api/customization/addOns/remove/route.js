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

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { addOnsId, isAddOnsRemoved, addOnsStatus } = reqBody;

    const query = `UPDATE customization_addons SET isAddOnsRemoved='${isAddOnsRemoved}', addOnsStatus='${addOnsStatus}' WHERE addOnsId = ${addOnsId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

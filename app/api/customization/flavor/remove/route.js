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

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { flavorId, isFlavorRemoved, flavorStatus } = reqBody;

    const query = `UPDATE customization_flavor SET isFlavorRemoved='${isFlavorRemoved}', flavorStatus='${flavorStatus}' WHERE flavorId = ${flavorId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

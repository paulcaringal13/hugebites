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
    const { shapeId, isShapeRemoved, shapeStatus } = reqBody;

    const query = `UPDATE customization_shape SET isShapeRemoved='${isShapeRemoved}', shapeStatus='${shapeStatus}' WHERE shapeId = ${shapeId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

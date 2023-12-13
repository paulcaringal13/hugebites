import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { cartAddOnsId } = reqBody;

    const query = `DELETE FROM cart_addons WHERE cartAddOnsId = ${cartAddOnsId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dayjs from "dayjs";

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
    const { orderedProductId, subTotal } = reqBody;

    const query = `UPDATE ordered_products SET subTotal ='${subTotal}' WHERE orderedProductId = ${orderedProductId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

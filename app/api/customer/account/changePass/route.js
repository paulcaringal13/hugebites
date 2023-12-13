import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

// CUSTOMER

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}
export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { password, accountId } = reqBody;

    const query = `UPDATE accounts SET password ='${password}' WHERE accountId = ${accountId}`;
    const results = await connection.execute(query);
    connection.end();

    console.log("====>", results);

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

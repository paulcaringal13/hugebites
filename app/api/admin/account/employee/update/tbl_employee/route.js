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

export async function PUT(request) {
  try {
    const connection = await con();

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    const reqBody = await request.json();
    const { firstName, lastName } = reqBody;

    const query = `UPDATE tbl_employee SET firstName ='${firstName}', lastName ='${lastName}' WHERE accountId = ${accountId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

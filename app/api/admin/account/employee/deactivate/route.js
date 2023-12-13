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

export async function PUT(req) {
  try {
    const connection = await con();

    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");

    const reqBody = await req.json();
    const { accStatus, isDeactivated } = reqBody;

    const query = `UPDATE accounts SET isDeactivated = '${isDeactivated}', accStatus = '${accStatus}' WHERE accountId = ${accountId}`;

    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

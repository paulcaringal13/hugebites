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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  const query = `SELECT accounts.*, tbl_employee.* FROM accounts JOIN tbl_employee ON accounts.accountId = tbl_employee.accountId WHERE accounts.accountId=${accountId}`;
  const results = await connection.execute(query, []);

  connection.end();

  return NextResponse.json(results);
}

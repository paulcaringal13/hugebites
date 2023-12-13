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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  const query = `SELECT accounts.*, tbl_customer.* FROM accounts JOIN tbl_customer ON accounts.accountId = tbl_customer.accountId WHERE accounts.username = '${username}' OR accounts.email = '${username}' AND accounts.password = PASSWORD('${password}') AND accounts.accountType = '1';`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

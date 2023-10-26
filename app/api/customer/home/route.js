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

// GET LOGGED IN USER
export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  const query = `SELECT accounts.accountId, tbl_customer.customerId, accounts.email,accounts.username, accounts.contact, accounts.userRole, tbl_customer.customerId, tbl_customer.firstName, tbl_customer.lastName, tbl_customer.address FROM accounts LEFT JOIN tbl_customer ON tbl_customer.accountId = accounts.accountId WHERE accounts.accountId = ${accountId}`;
  const res = await connection.execute(query);
  connection.end();

  const result = res[0][0];

  return NextResponse.json(result);
}

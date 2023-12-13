import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const connection = await con();

  const query =
    "SELECT accounts.accountId, accounts.accStatus, tbl_customer.totalSpent, tbl_customer.customerId, tbl_customer.firstName, tbl_customer.lastName, accounts.email, accounts.username, accounts.contact, tbl_customer.address, accounts.accountType, accounts.userRole FROM accounts LEFT JOIN tbl_customer ON tbl_customer.accountId = accounts.accountId WHERE accounts.accountType = 1;";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

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

export async function GET() {
  const connection = await con();

  const query =
    "SELECT accounts.accountId, tbl_customer.customerId, tbl_customer.firstName, tbl_customer.lastName, accounts.email, accounts.username, accounts.contact, tbl_customer.address, accounts.accountType, accounts.userRole, tbl_customer.accStatus FROM tbl_customer LEFT JOIN accounts ON tbl_customer.accountId = accounts.accountId";
  const results = await connection.execute(query, []);
  connection.end();

  // console.log(query);

  return NextResponse.json({ results: results[0] });
}

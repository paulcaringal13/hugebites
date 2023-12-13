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

export async function GET(request) {
  const connection = await con();

  const query = `SELECT orders.*, tbl_customer.totalSpent, tbl_customer.firstName, tbl_customer.accountId, accounts.email
  FROM orders
  LEFT JOIN tbl_customer ON orders.customerId = tbl_customer.customerId 
  LEFT JOIN accounts ON accounts.accountId = tbl_customer.accountId
   ORDER BY orders.orderId DESC`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

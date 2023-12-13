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
    "SELECT vouchers.*, customer_voucher.isUsed, customer_voucher.customerVoucherId, tbl_customer.*, accounts.email FROM customer_voucher JOIN tbl_customer ON customer_voucher.customerId = tbl_customer.customerId JOIN vouchers ON customer_voucher.voucherId = vouchers.voucherId JOIN accounts ON accounts.accountId = tbl_customer.accountId";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { voucherId, customerId } = reqBody;

  const query = `INSERT INTO customer_voucher (voucherId, customerId) VALUES ('${voucherId}', '${customerId}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

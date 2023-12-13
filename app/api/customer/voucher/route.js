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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");

  const query = `SELECT customer_voucher.customerVoucherId, vouchers.*, tbl_customer.*, accounts.email FROM customer_voucher JOIN tbl_customer ON customer_voucher.customerId = tbl_customer.customerId JOIN vouchers ON customer_voucher.voucherId = vouchers.voucherId JOIN accounts ON accounts.accountId = tbl_customer.accountId WHERE customer_voucher.customerId = ${customerId} AND isUsed = 0`;
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { customerVoucherId } = reqBody;

  const query = `UPDATE customer_voucher SET isUsed=1 WHERE customerVoucherId=${customerVoucherId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dayjs from "dayjs";

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
  const orderId = searchParams.get("orderId");

  const query = `SELECT 
  orders.*,
  tbl_customer.accountId,
  tbl_customer.firstName,
  tbl_customer.lastName,
  accounts.email,
  accounts.contact,
  customer_voucher.voucherId,
  vouchers.discount,
  vouchers.voucherName
  FROM orders 
  LEFT JOIN tbl_customer ON tbl_customer.customerId = orders.customerId
  LEFT JOIN accounts ON accounts.accountId = tbl_customer.accountId
  LEFT JOIN customer_voucher ON orders.customerVoucherId = customer_voucher.customerVoucherId
  LEFT JOIN vouchers ON vouchers.voucherId = customer_voucher.voucherId
  WHERE orders.orderId = ${orderId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { orderId, isPriceFinal, totalPrice } = reqBody;

    const query = `UPDATE orders SET isPriceFinal ='${isPriceFinal}', totalPrice ='${totalPrice}' WHERE orderId = ${orderId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

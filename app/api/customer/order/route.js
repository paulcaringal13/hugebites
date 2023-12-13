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

  const query = `SELECT orders.orderId, orders.accountId, firstName, lastName, contact, email, totalPrice, dateOrdered, datePickUp, paymentDeadline, refundDeadline, status, paymentMethod, proofOfPaymentImage, hasRequest, isPaid, isCancelled FROM orders LEFT JOIN tbl_customer ON orders.accountId = tbl_customer.customerId WHERE orders.orderId = ${orderId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const reqBody = await request.json();
  const { status, hasRequest } = reqBody;

  const query = `UPDATE orders SET status ='${status}', hasRequest ='${hasRequest}' WHERE orderId = ${orderId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

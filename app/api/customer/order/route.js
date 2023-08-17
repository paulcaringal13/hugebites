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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const query = `SELECT orders.orderId, orders.accountId, firstName, lastName, contact, email, totalPrice, dateOrdered, datePickUp, paymentDeadline, cancellationDeadline, status, paymentMethod FROM orders LEFT JOIN accounts ON orders.accountId = accounts.accountId WHERE orders.orderId = ${orderId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

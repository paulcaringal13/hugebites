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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  const query = `SELECT * FROM orders WHERE accountId = ${accountId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();

    const {
      totalPrice,
      accountId,
      dateOrdered,
      datePickUp,
      paymentDeadline,
      refundDeadline,
      status,
      paymentMethod,
      proofOfPaymentImage,
      hasRequest,
      isPaid,
      isCancelled,
    } = reqBody;
    console.log(proofOfPaymentImage);
    const query = `INSERT INTO orders (totalPrice, accountId, dateOrdered, datePickUp, paymentDeadline, refundDeadline, status, paymentMethod, proofOfPaymentImage, hasRequest, isPaid, isCancelled) VALUES ('${totalPrice}', '${accountId}', '${dateOrdered}', '${datePickUp}', '${paymentDeadline}', '${refundDeadline}', '${status}', '${paymentMethod}', '${proofOfPaymentImage}', '${hasRequest}', '${isPaid}', '${isCancelled}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

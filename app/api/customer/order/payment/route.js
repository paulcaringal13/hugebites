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

export async function PUT(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const reqBody = await request.json();
  const { proofOfPaymentImage, isPaid } = reqBody;

  console.log(proofOfPaymentImage);

  const query = `UPDATE orders SET proofOfPaymentImage ='${proofOfPaymentImage}', isPaid ='${isPaid}' WHERE orderId = ${orderId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

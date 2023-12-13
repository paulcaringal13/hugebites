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

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();

    const {
      totalPrice,
      customerId,
      dateOrdered,
      datePickUp,
      paymentDeadline,
      refundDeadline,
      orderStatus,
      methodOfPayment,
      customerVoucherId,
      hasVoucher,
    } = reqBody;
    let query;

    !customerVoucherId
      ? (query = `INSERT INTO orders (totalPrice, customerId, dateOrdered, datePickUp, paymentDeadline, refundDeadline, orderStatus, methodOfPayment, hasVoucher) VALUES ('${totalPrice}', '${customerId}', '${dateOrdered}', '${datePickUp}', '${paymentDeadline}', '${refundDeadline}', '${orderStatus}', '${methodOfPayment}', '${hasVoucher}')`)
      : (query = `INSERT INTO orders (totalPrice, customerId, dateOrdered, datePickUp, paymentDeadline, refundDeadline, orderStatus, methodOfPayment, customerVoucherId, hasVoucher) VALUES ('${totalPrice}', '${customerId}', '${dateOrdered}', '${datePickUp}', '${paymentDeadline}', '${refundDeadline}', '${orderStatus}', '${methodOfPayment}', '${customerVoucherId}', '${hasVoucher}')`);

    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dayjs from "dayjs";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Manila");

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

  const query = `SELECT * FROM customer_request WHERE customerId = ${customerId} ORDER BY customerRequestId DESC`;
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
      refundImage,
      orderId,
      refundMessage,
      requestStatus,
      typeOfRequest,
      totalPrice,
      customerId,
      refundDeadline,
      dateRequested,
      moneyRefunded,
    } = reqBody;

    const query = `INSERT INTO customer_request (
      orderId,
      customerId,
      totalPrice,
      dateRequested,
      requestStatus,
      refundDeadline,
      typeOfRequest,
      moneyRefunded,
      refundMessage,
      refundImage
      ) VALUES ('${orderId}', '${customerId}','${totalPrice}','${dateRequested}','${requestStatus}','${refundDeadline}', '${typeOfRequest}', '${moneyRefunded}', '${refundMessage}', '${refundImage}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

// cancel
// export async function PUT(request) {
//   const connection = await con();

//   const reqBody = await request.json();
//   const { orderId, requestStatus, isCancelled } = reqBody;

//   const query = `UPDATE customer_request SET requestStatus ='${requestStatus}', isCancelled=${isCancelled}  WHERE orderId = ${orderId}`;
//   const results = await connection.execute(query);
//   connection.end();

//   return NextResponse.json(results);
// }

// cancel
export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { orderId } = reqBody;

  const query = `DELETE FROM customer_request WHERE orderId = ${orderId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

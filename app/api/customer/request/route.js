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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  const query = `SELECT * FROM customer_request WHERE customerId = ${accountId}`;
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
      orderId,
      customerId,
      totalPrice,
      dateRequested,
      requestStatus,
      isRejected,
      isAccepted,
      refundDeadline,
      typeOfRequest,
    } = reqBody;

    const query = `INSERT INTO customer_request (
      orderId,
      customerId,
      totalPrice,
      dateRequested,
      requestStatus,
      isRejected,
      isAccepted,
      refundDeadline,
      typeOfRequest) VALUES ('${orderId}', '${customerId}','${totalPrice}','${dateRequested}','${requestStatus}','${isRejected}','${isAccepted}','${refundDeadline}','${typeOfRequest}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

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

  const query = `SELECT * FROM customer_request`;
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
      isAcknowledged,
      refundDeadline,
      orderStatus,
      typeOfRequest,
    } = reqBody;

    const query = `INSERT INTO customer_request (      
      orderId,
      customerId,
      totalPrice,
      dateRequested,
      requestStatus,
      isAcknowledged,
      refundDeadline,
      orderStatus,
      typeOfRequest) VALUES ('${orderId}', '${customerId}','${totalPrice}','${dateRequested}','${requestStatus}','${isAcknowledged}','${refundDeadline}','${orderStatus}','${typeOfRequest}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();

    const {
      orderId,
      customerRequestId,
      requestStatus,
      orderStatus,
      isRejected,
      isAccepted,
      isCancelled,
      isPaid,
      hasRequest,
    } = reqBody;

    const requestQuery = `UPDATE customer_request SET requestStatus = '${requestStatus}', isAccepted = '${isAccepted}', isRejected = '${isRejected}' WHERE customerRequestId = ${customerRequestId}`;
    const requestResults = await connection.execute(requestQuery);

    const orderQuery = `UPDATE orders SET status = '${orderStatus}', isCancelled = '${isCancelled}', isPaid = '${isPaid}', hasRequest = '${hasRequest}' WHERE orderId= ${orderId}`;
    const orderResults = await connection.execute(orderQuery);
    connection.end();
    return NextResponse.json(requestResults, orderResults);
  } catch (error) {
    console.log(error);
  }
}

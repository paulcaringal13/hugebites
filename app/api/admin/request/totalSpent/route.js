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

  const query = `SELECT
  o.*,
  c.*,
  r.*
FROM
  orders o
JOIN
  customer_request r ON r.orderId = o.orderId
JOIN
  tbl_customer c ON o.customerId = c.customerId;`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { customerId, totalSpent } = reqBody;

    const query = `UPDATE tbl_customer SET totalSpent ='${totalSpent}' WHERE customerId = ${customerId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

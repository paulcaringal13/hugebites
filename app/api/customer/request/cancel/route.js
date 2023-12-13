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

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { orderId, hasRequest } = reqBody;

  const query = `UPDATE orders SET hasRequest ='${hasRequest}', requestId ='' WHERE orderId = ${orderId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

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
  const customerId = searchParams.get("customerId");

  const query = `SELECT totalSpent FROM tbl_customer WHERE customerId = ${customerId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { totalSpent, customerId } = reqBody;

  const query = `UPDATE tbl_customer SET totalSpent ='${totalSpent}' WHERE customerId = ${customerId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

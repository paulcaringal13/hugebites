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

  const emailAdd = searchParams.get("email");

  const query = `SELECT email FROM tbl_admin WHERE email = '${emailAdd}' UNION SELECT email FROM tbl_customer WHERE email = '${emailAdd}' UNION SELECT email FROM tbl_employee WHERE email = '${emailAdd}'`;
  const results = await connection.execute(query);

  connection.end();

  return NextResponse.json(results[0][0]);
}

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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const prodId = searchParams.get("prodId");

  const query = `SELECT
  cf.*,
  CONCAT(tc.firstName, ' ', tc.lastName) AS customerFullName,
  a.avatar
  FROM
    customer_feedback cf
  JOIN
    tbl_customer tc ON cf.customerId = tc.customerId
  JOIN
  accounts a ON tc.accountId = a.accountId WHERE productId=${prodId}`;

  const results = await connection.execute(query);
  connection.end();

  console.log(query);

  return NextResponse.json(results[0]);
}

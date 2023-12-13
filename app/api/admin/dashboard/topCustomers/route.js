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

  const query = `SELECT
  customerId,
  CONCAT(firstName, ' ', lastName) AS fullName,
  firstName,
  lastName,
  accounts.avatar,
  totalSpent
FROM
  tbl_customer
JOIN
accounts ON accounts.accountId = tbl_customer.accountId
ORDER BY
  totalSpent DESC
LIMIT 5;`;

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

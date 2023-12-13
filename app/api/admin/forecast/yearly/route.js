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
  YEAR(dateOrdered) AS yearOrdered,
  SUM(amountPaid) AS totalSales
FROM
  orders
WHERE
  YEAR(dateOrdered) != 2023
GROUP BY
  yearOrdered
ORDER BY
  yearOrdered;`;

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

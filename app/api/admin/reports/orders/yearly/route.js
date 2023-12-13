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
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let query = `SELECT
  YEAR(dateOrdered) AS yearOrdered,
  SUM(quantity) AS totalOrders
FROM
  ordered_products
JOIN
  orders ON ordered_products.orderId = orders.orderId
WHERE
  YEAR(dateOrdered) BETWEEN ${startDate} AND ${endDate}
GROUP BY
  YEAR(dateOrdered)
ORDER BY
  YEAR(dateOrdered);`;

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

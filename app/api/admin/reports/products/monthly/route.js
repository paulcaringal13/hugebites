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
  const reportType = searchParams.get("reportType");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  let query;

  reportType == "all"
    ? (query = `SELECT
    op.productId AS id,
    p.productName AS name,
        YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    SUM(op.subTotal) AS totalSales
FROM
    ordered_products op
JOIN
    products p ON op.productId = p.productId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}

GROUP BY
    op.productId, p.productName
ORDER BY
    totalSales DESC;`)
    : null;

  reportType == "common"
    ? (query = `SELECT
    op.productId AS id,
    p.productName AS name,
        YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    SUM(op.subTotal) AS totalSales
FROM
    ordered_products op
JOIN
    products p ON op.productId = p.productId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
    AND p.cakeTypeId = 1
GROUP BY
    op.productId, p.productName
ORDER BY
    totalSales DESC;`)
    : null;

  reportType == "special"
    ? (query = `SELECT
    op.productId AS id,
    p.productName AS name,
        YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    SUM(op.subTotal) AS totalSales
FROM
    ordered_products op
JOIN
    products p ON op.productId = p.productId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
    AND p.cakeTypeId != 1
GROUP BY
    op.productId, p.productName
ORDER BY
    totalSales DESC;`)
    : null;

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

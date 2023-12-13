import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

// GET LOGGED IN USER
export async function GET(request) {
  const connection = await con();

  const query = `SELECT
  op.productId AS id,
  products.*,
  caketype.*,
  SUM(op.subTotal) AS totalSales
FROM
  ordered_products op
JOIN
  products ON op.productId = products.productId
JOIN
  orders o ON op.orderId = o.orderId
JOIN
  caketype ON products.cakeTypeId = caketype.cakeTypeId
GROUP BY
  op.productId, products.productName
ORDER BY
  totalSales DESC
LIMIT 4;`;
  const res = await connection.execute(query);
  connection.end();

  const result = res[0];

  return NextResponse.json(result);
}

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
  p.image,
  op.productId,
  p.productName,
  pc.categoryName,
  ct.cakeTypeName,
    SUM(op.subTotal) AS totalSales
  FROM
    products p
  JOIN
    ordered_products op ON p.productId = op.productId
  JOIN
    caketype ct ON p.cakeTypeId = ct.cakeTypeId
  JOIN
    product_categories pc ON p.categoryId = pc.categoryId
  GROUP BY
    p.image, op.productId, p.productName
  ORDER BY
    totalSales DESC
  LIMIT 5;`;

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

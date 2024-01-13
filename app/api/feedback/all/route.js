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
  p.productId,
  ROUND(COALESCE(AVG(cf.rating), 0), 2) AS averageRating,
  COUNT(cf.feedbackId) AS totalFeedbacks,
  p.productName,
  p.productDescription,
  p.image,
  p.categoryId,
  p.cakeTypeId
FROM
  products p
LEFT JOIN
  customer_feedback cf ON p.productId = cf.productId
LEFT JOIN
  product_categories ON product_categories.categoryId = p.categoryId
LEFT JOIN
  cakeType ON cakeType.cakeTypeId = p.cakeTypeId
GROUP BY
  p.productId, p.productName, p.productDescription;

`;

  const results = await connection.execute(query);
  connection.end();

  console.log(query);

  return NextResponse.json(results[0]);
}

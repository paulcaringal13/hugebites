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

export async function GET(request, path) {
  const connection = await con();

  const query = `SELECT products.categoryId, products.productId, products.image, products.isRemoved, products.isSpecial, products.status, products.productName, product_categories.categoryImage, product_categories.categoryName FROM products LEFT JOIN product_categories ON products.categoryId = product_categories.categoryId LIMIT 8`;

  // const query = `SELECT * FROM products INNER `;
  const results = await connection.execute(query);
  connection.end();

  const data = results[0];

  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// example usage: GET item by id, with query param

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export async function GET(request, path) {
  const connection = await con();

  // path params api/test/:id
  const { params } = path;
  const id = params.id;

  // `SELECT * FROM products WHERE productId = ${id}`
  const query = `SELECT * FROM products INNER JOIN product_categories ON products.categoryId = product_categories.categoryId WHERE products.productId = ${id}`;
  const results = await connection.execute(query);
  connection.end();
  const res1 = results[0];
  const product = res1[0];

  return NextResponse.json({ results: product });
}

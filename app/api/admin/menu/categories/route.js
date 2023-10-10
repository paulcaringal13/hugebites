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

export async function GET() {
  const connection = await con();

  const query = `SELECT product_categories.categoryId, product_categories.categoryName, product_categories.isSpecial, product_categories.menuId, menu.menuName FROM product_categories LEFT JOIN menu ON product_categories.menuId = menu.menuId`;
  const results = await connection.execute(query);
  connection.end();

  console.log(results);

  return NextResponse.json({ results: results });
}

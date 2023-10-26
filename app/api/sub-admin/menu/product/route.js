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

export async function GET(request, path) {
  const connection = await con();

  const query = `SELECT products.productId, products.categoryId, product_categories.menuId, products.productName, product_categories.categoryName, menu.menuName, products.status, products.image, product_categories.isSpecial, products.isRemoved FROM products LEFT JOIN product_categories ON products.categoryId = product_categories.categoryId LEFT JOIN menu ON product_categories.menuId = menu.menuId`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json({ results: results });
}

export async function POST(request, path) {
  const connection = await con();

  const reqBody = await request.json();
  const { categoryId, productName, image, isRemoved, status } = reqBody;
  try {
    const query = `INSERT INTO products ( categoryId, productName, image, isRemoved, status) VALUES ('${categoryId}', '${productName}','${image}','${isRemoved}', '${status}')`;
    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { productId, productName, categoryId, image } = reqBody;

    const query = `UPDATE products SET productName ='${productName}', categoryId ='${categoryId}', image='${image}' WHERE productId = ${productId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

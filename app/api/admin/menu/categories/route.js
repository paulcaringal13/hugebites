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

  const query = `SELECT * FROM product_categories`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json({ results: results });
}
// export async function GET() {
//   const connection = await con();

//   const query = `SELECT product_categories.categoryId, product_categories.categoryName, product_categories.isSpecial, product_categories.menuId, menu.menuName FROM product_categories LEFT JOIN menu ON product_categories.menuId = menu.menuId`;
//   const results = await connection.execute(query);
//   connection.end();

//   return NextResponse.json({ results: results });
// }

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { categoryName, categoryImage } = reqBody;

  const query = `INSERT INTO product_categories ( categoryName, categoryImage ) VALUES ('${categoryName}','${categoryImage}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function PUT(req, path) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { categoryId, categoryName, categoryImage } = reqBody;

    const query = `UPDATE product_categories SET categoryName ='${categoryName}', categoryImage ='${categoryImage}' WHERE categoryId = ${categoryId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { categoryId } = reqBody;

  const query = `DELETE FROM product_categories WHERE categoryId = ${categoryId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

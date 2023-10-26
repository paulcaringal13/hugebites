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

  const query = `SELECT * FROM products INNER JOIN product_categories ON products.categoryId = product_categories.categoryId`;
  const results = await connection.execute(query);
  connection.end();

  const data = results[0];

  return NextResponse.json(data);
}

// export async function POST(req, res) {
//   try {
//     const connection = await con();

//     const reqBody = await req.json();
//     const {
//       totalPrice,
//       flavor,
//       packaging,
//       dragees,
//       shape,
//       darkColoredBase,
//       freshFlowers,
//       quantity,
//     } = reqBody;

//     const query = `INSERT INTO test_table (totalPrice, flavor, packaging, dragees, shape, darkColoredBase, freshFlowers, quantity) VALUES ('${totalPrice}', '${flavor}' '${packaging}', '${dragees}' '${shape}', '${darkColoredBase}' '${freshFlowers}', '${quantity}')`;
//     const results = await connection.execute(query);
//     connection.end();

//     return NextResponse.json({ reqBody });
//   } catch (error) {
//     console.log(error);
//   }
// }

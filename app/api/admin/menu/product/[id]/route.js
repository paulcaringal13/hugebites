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

  // console.log(path.params);

  // const reqBody = await request.json();
  // const { productName, price, description, image } = reqBody;
  // console.log(productName);
  // console.log(price);
  // console.log(description);
  // console.log(image);

  const query = `SELECT * FROM products WHERE id = ${id}`;
  const results = await connection.execute(query);
  connection.end();
  // results: results[0];
  // console.log(results[0][0]);
  const res1 = results[0];
  const product = res1[0];

  // console.log("reqBody:", reqBody);
  return NextResponse.json({ results: product });

  // query params api/test/:id?name=<value>
  // const { searchParams } = new URL(request.url);
  // const name = searchParams.get("name");
  // const price = searchParams.get("price");
  // const description = searchParams.get("description");

  // console.log(new URL(request.url));

  // return NextResponse.json({
  //   results: {
  //     id: id,
  //     name: name,
  //     price: price,
  //     description: description,
  //   },
  // });
}

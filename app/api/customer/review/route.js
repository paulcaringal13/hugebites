import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dayjs from "dayjs";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { orderedProductId } = reqBody;

  const query = `UPDATE ordered_products SET isReviewed=1 WHERE orderedProductId = ${orderedProductId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

export async function POST(request) {
  const connection = await con();

  const reqBody = await request.json();
  const { comment, commentImage, rating, customerId, productId } = reqBody;
  const image = !commentImage ? "" : commentImage;

  const query = `INSERT INTO customer_feedback (customerId, productId, comment, commentImage, rating) VALUES ('${customerId}', '${productId}', '${comment}', '${image}' , '${rating}')`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json("a");
}

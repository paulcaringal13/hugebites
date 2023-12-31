import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

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
  const customerId = searchParams.get("customerId");

  const query = `SELECT cart.cartId, cart.productId, cart.customerId, cart.quantity, customization_packaging.packagingPrice ,customization_shape.shapePrice, customization_color.colorPrice, cart.subTotal FROM cart LEFT JOIN customization_packaging ON customization_packaging.packagingId = cart.packagingId  LEFT JOIN customization_shape ON customization_shape.shapeId = cart.shapeId LEFT JOIN customization_color ON customization_color.colorId = cart.colorId WHERE cart.customerId = ${customerId}`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results);
}

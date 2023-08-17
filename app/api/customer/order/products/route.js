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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const query = `SELECT 
  ordered_products.orderedProductId,
  products.productName, 
  products.image,
  customization_flavor.flavorName, 
  customization_packaging.packagingName, 
  customization_dragees.drageesName,
  customization_shape.shapeName, 
  customization_base.darkColoredBaseName, 
  customization_flowers.freshFlowerName, 
  ordered_products.quantity, 
  ordered_products.subtotal 
  FROM ordered_products 
  LEFT JOIN products ON ordered_products.productId = products.productId 
  LEFT JOIN customization_flavor ON ordered_products.flavorId = customization_flavor.flavorId 
  LEFT JOIN customization_packaging ON ordered_products.packagingId = customization_packaging.packagingId
  LEFT JOIN customization_dragees ON ordered_products.drageesId = customization_dragees.drageesId
  LEFT JOIN customization_shape ON ordered_products.shapeId = customization_shape.shapeId
  LEFT JOIN customization_flowers ON ordered_products.freshFlowerId = customization_flowers.freshFlowerId
  LEFT JOIN customization_base ON ordered_products.darkColoredBaseId = customization_base.darkColoredBaseId
  WHERE ordered_products.orderId = ${orderId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

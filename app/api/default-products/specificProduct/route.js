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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  const query = `SELECT default_products.*,
  products.categoryId,
  products.cakeTypeId,
  products.productName,
  products.image,
  products.isRemoved,
  products.isSpecial,
  product_categories.categoryName,
  customization_flavor.flavorName,
  customization_flavor.flavorPrice,
  customization_color.colorName,
  customization_color.colorPrice,
  customization_shape.shapeName,
  customization_shape.shapePrice,
  customization_packaging.size,
  customization_packaging.sizeDescription,
  customization_packaging.packagingPrice FROM default_products 
  LEFT JOIN products ON products.productId = default_products.productId
  LEFT JOIN product_categories ON product_categories.categoryId = products.categoryId
  LEFT JOIN customization_flavor ON customization_flavor.flavorId = default_products.flavorId
  LEFT JOIN customization_color ON customization_color.colorId = default_products.colorId
  LEFT JOIN customization_shape ON customization_shape.shapeId = default_products.shapeId
  LEFT JOIN customization_packaging ON customization_packaging.packagingId = default_products.packagingId WHERE default_products.productId = ${productId} ORDER BY default_total ASC`;
  const results = await connection.execute(query);
  connection.end();

  return NextResponse.json(results[0]);
}

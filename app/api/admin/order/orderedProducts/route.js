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
  ordered_products.*,
  product_categories.categoryName,
  products.productName, 
  products.image,
  customization_flavor.flavorName,  
  customization_flavor.flavorPrice,
  customization_packaging.size, 
  customization_packaging.packagingPrice, 
  customization_shape.shapeName, 
  customization_shape.shapePrice,
  customization_color.colorName, 
  customization_color.colorPrice, 
  products.cakeTypeId
  FROM ordered_products 
  LEFT JOIN products ON ordered_products.productId = products.productId 
  LEFT JOIN product_categories ON product_categories.categoryId = products.categoryId 
  LEFT JOIN customization_flavor ON ordered_products.flavorId = customization_flavor.flavorId 
  LEFT JOIN customization_packaging ON ordered_products.packagingId = customization_packaging.packagingId
  LEFT JOIN customization_shape ON ordered_products.shapeId = customization_shape.shapeId
  LEFT JOIN customization_color ON ordered_products.colorId = customization_color.colorId
  WHERE ordered_products.orderId = ${orderId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { orderedProductId, isPriceFinal, subTotal } = reqBody;

    const query = `UPDATE ordered_products SET isPriceFinal ='${isPriceFinal}', subTotal ='${subTotal}' WHERE orderedProductId = ${orderedProductId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

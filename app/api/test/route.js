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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  console.log("~~~~~~~~~`", searchParams);
  // const x = searchParams.get("accountId");
  // console.log("~~~~~~~~~~~~", request);

  // const { params } = path;
  // const id = localStorage.getItem("cartId");?

  // 139

  const query = `SELECT cartId, quantity, subTotal, shapeName, productName, packagingName, flavorName, drageesName, darkColoredBaseName, freshFlowerName, image FROM cart LEFT JOIN customization_shape ON cart.shapeId = customization_shape.shapeId LEFT JOIN products ON cart.productId = products.productId LEFT JOIN customization_packaging ON cart.packagingId = customization_packaging.packagingId LEFT JOIN customization_flavor ON cart.flavorId = customization_flavor.flavorId LEFT JOIN customization_dragees ON cart.drageesId = customization_dragees.drageesId LEFT JOIN customization_flowers ON cart.freshFlowerId = customization_flowers.freshFlowerId LEFT JOIN customization_base ON cart.darkColoredBaseId = customization_base.darkColoredBaseId WHERE cart.accountId = 1`; // change accountID
  const res = await connection.execute(query);
  connection.end();

  // console.log("~~~~~~~~~`", new URL(request.url));
  const results = res[0];

  console.log(results);

  return NextResponse.json(results);
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    console.log("~~~~~~~~~~", reqBody);

    const {
      cartId,
      accountId,
      productId,
      packagingId,
      flavorId,
      drageesId,
      shapeId,
      quantity,
      darkColoredBaseId,
      freshFlowerId,
      subTotal,
    } = reqBody;
    const query = `INSERT INTO cart (cartId, accountId, productId, orderId, packagingId, flavorId, drageesId, shapeId, quantity, darkColoredBaseId, freshFlowerId, subTotal) VALUES ('${cartId}', '${accountId}', '${productId}' ,'${orderId}','${packagingId}','${flavorId}','${drageesId}','${shapeId}','${quantity}','${darkColoredBaseId}','${freshFlowerId}','${subTotal}')`;
    const results = await connection.execute(query);
    connection.end();

    // console.log("results====>", results);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

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
  const customerId = searchParams.get("customerId");

  const query = `SELECT cartId, customerId, cart.productId, quantity, subTotal, cart.shapeId, cart.flavorId, cart.colorId, cart.packagingId, shapeName, productName, size, flavorName, colorName,  packagingPrice, shapePrice, colorPrice, image, message FROM cart LEFT JOIN customization_shape ON cart.shapeId = customization_shape.shapeId LEFT JOIN products ON cart.productId = products.productId LEFT JOIN customization_packaging ON cart.packagingId = customization_packaging.packagingId LEFT JOIN customization_flavor ON cart.flavorId = customization_flavor.flavorId LEFT JOIN customization_color ON cart.colorId = customization_color.colorId WHERE cart.customerId = ${customerId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const {
      customerId,
      productId,
      packagingId,
      flavorId,
      shapeId,
      quantity,
      colorId,
      subTotal,
      message,
    } = reqBody;

    const query = `INSERT INTO cart (customerId, productId, packagingId, flavorId, quantity ${
      !shapeId ? "," : ",shapeId,"
    } colorId, subTotal, message) VALUES ('${customerId}', '${productId}','${packagingId}','${flavorId}','${quantity}' ${
      !shapeId ? "," : `,'${shapeId}',`
    } '${colorId}','${subTotal}', '${message}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();

    const { customerId } = reqBody;

    const query = `DELETE FROM cart WHERE customerId = ${customerId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const {
      cartId,
      packagingId,
      shapeId,
      colorId,
      quantity,
      subTotal,
      message,
      flavorId,
    } = reqBody;

    const query = `UPDATE cart SET flavorId ='${flavorId}', quantity ='${quantity}' ${
      !shapeId ? `,shapeId=NULL,` : `,shapeId='${shapeId}',`
    } subTotal='${subTotal}', packagingId='${packagingId}', colorId='${colorId}', message='${message}' WHERE cartId = ${cartId}`;

    const results = await connection.execute(query);
    connection.end();
    console.log(query);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

// export async function DELETE(request) {
//   try {
//     const connection = await con();

//     const reqBody = await request.json();
//     const { cartId } = reqBody;
//     const query = `DELETE FROM cart WHERE cartId = ${cartId}`;

//     const results = await connection.execute(query);
//     connection.end();
//     console.log(query);
//     return NextResponse.json(results);
//   } catch (error) {
//     console.log(error);
//   }
// }

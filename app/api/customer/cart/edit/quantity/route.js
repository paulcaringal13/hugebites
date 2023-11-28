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

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { cartId, quantity, subTotal } = reqBody;

    const query = `UPDATE cart SET quantity ='${quantity}', subTotal='${subTotal}' WHERE cartId = ${cartId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { cartId } = reqBody;
    const query = `DELETE FROM cart WHERE cartId = ${cartId}`;

    const results = await connection.execute(query);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

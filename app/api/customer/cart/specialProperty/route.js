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

export async function GET(request) {
  try {
    const connection = await con();

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    const query = `SELECT * FROM cart_special_property WHERE customerId = ${customerId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}
export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const {
    cartId,
    customerId,
    cartSpecialPropertyValue,
    cartSpecialPropertyName,
  } = reqBody;
  try {
    const query = `INSERT INTO cart_special_property (cartId,customerId, cartSpecialPropertyValue, cartSpecialPropertyName) VALUES ('${cartId}', '${customerId}', '${cartSpecialPropertyValue}', '${cartSpecialPropertyName}')`;
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
    const { cartSpecialPropertyId, cartSpecialPropertyValue } = reqBody;

    const query = `UPDATE cart_special_property SET cartSpecialPropertyValue ='${cartSpecialPropertyValue}' WHERE cartSpecialPropertyId = ${cartSpecialPropertyId}`;

    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

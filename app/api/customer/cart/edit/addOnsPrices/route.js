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

    const query = `SELECT cart_addons.cartAddOnsId, cart_addons.cartId, cart_addons.addOnsId, cart_addons.addOnsQuantity, cart_addons.addOnsTotal, addOnsName, addOnsPrice FROM cart_addons LEFT JOIN customization_addons ON cart_addons.addOnsId = customization_addons.addOnsId WHERE customerId = ${customerId}`;
    const results = await connection.execute(query);
    connection.end();
    // , customization_addons.addOnsName, customization_addons.addOnsPrice, cart_addons__addons.addOnsQuantity, cart_addons__addOns.addOnsTotal,
    console.log(query);

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  const query = `SELECT ordered_products_addons.orderedProductAddOnsId,
  ordered_products_addons.orderedProductId,
   customization_addons.addOnsId,
   customization_addons.addOnsName, 
   customization_addons.addOnsPrice,
   ordered_products_addons.addOnsQuantity, 
   ordered_products_addons.addOnsTotal,
   ordered_products_addons.specialPropertyId,
   special_products_property.specialPropertyName,
   special_products_property.specialPropertyValue
   FROM ordered_products_addons 
   LEFT JOIN customization_addons ON customization_addons.addOnsId = ordered_products_addons.addOnsId
   LEFT JOIN special_products_property ON ordered_products_addons.specialPropertyId = special_products_property.specialPropertyId
   WHERE ordered_products_addons.orderId = ${orderId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

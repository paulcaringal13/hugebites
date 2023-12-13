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
  const reportType = searchParams.get("reportType");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let query;

  reportType == "addons"
    ? (query = `SELECT
    ca.addOnsId AS id,
    ca.addOnsName AS name,
    SUM(oa.addOnsQuantity) AS totalQuantity
FROM
    ordered_products_addons oa
JOIN
    customization_addons ca ON ca.addOnsId = oa.addOnsId
JOIN
    ordered_products op ON op.orderedProductId = oa.orderedProductId
JOIN
    orders o ON o.orderId = op.orderId
WHERE
    oa.orderedProductId IS NOT NULL
    AND o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
GROUP BY
    ca.addOnsId, ca.addOnsName
ORDER BY
totalQuantity DESC;`)
    : null;

  reportType == "shape"
    ? (query = `SELECT
    op.shapeId AS id,
    cs.shapeName AS name,
    COUNT(*) AS totalQuantity
FROM
    ordered_products op
JOIN
    customization_shape cs ON cs.shapeId = op.shapeId
JOIN
    orders o ON o.orderId = op.orderId
WHERE
 o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
GROUP BY
    op.shapeId, cs.shapeName
ORDER BY
    totalQuantity DESC;`)
    : null;

  reportType == "flavor"
    ? (query = `SELECT
    op.flavorId AS id,
    cf.flavorName AS name,
    COUNT(*) AS totalQuantity
FROM
    ordered_products op
JOIN
    customization_flavor cf ON cf.flavorId = op.flavorId
JOIN
    orders o ON o.orderId = op.orderId
WHERE
 o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
GROUP BY
    op.flavorId, cf.flavorName
ORDER BY
    totalQuantity DESC;`)
    : null;

  reportType == "packaging"
    ? (query = `SELECT
    op.packagingId AS id,
    CONCAT(cp.size, ' (', p.productName, ')') AS name,
    COUNT(*) AS totalQuantity
    FROM
    ordered_products op
    JOIN
    customization_packaging cp ON cp.packagingId = op.packagingId
    JOIN
    products p ON p.productId = op.productId
    JOIN
    orders o ON o.orderId = op.orderId
    WHERE
 o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
    GROUP BY
    op.packagingId
    ORDER BY
    totalQuantity DESC;`)
    : null;

  reportType == "color"
    ? (query = `SELECT
    op.colorId AS id,
    cc.colorName AS name,
    COUNT(*) AS totalQuantity
    FROM
    ordered_products op
    JOIN
    customization_color cc ON cc.colorId = op.colorId
    JOIN
    orders o ON o.orderId = op.orderId
    WHERE
o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
    GROUP BY
    op.colorId, cc.colorName
    ORDER BY
    totalQuantity DESC`)
    : null;

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

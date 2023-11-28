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

  reportType == "all"
    ? (query = `SELECT
    op.productId,
    p.productName,
    SUM(op.subTotal) AS totalAmountOrdered
  FROM
    ordered_products op
  JOIN
    products p ON p.productId = op.productId
  JOIN
    orders o ON o.orderId = op.orderId
  WHERE
    o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
  GROUP BY
    op.productId, p.productName
  ORDER BY
    totalAmountOrdered DESC;`)
    : null;

  reportType == "common"
    ? (query = `SELECT
    op.productId,
    p.productName,
    SUM(op.subTotal) AS totalAmountOrdered
FROM
    ordered_products op
JOIN
    products p ON p.productId = op.productId
JOIN
    orders o ON o.orderId = op.orderId
WHERE
    p.cakeTypeId = 1
    AND o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
GROUP BY
    op.productId, p.productName
ORDER BY
    totalAmountOrdered DESC;`)
    : null;

  reportType == "special"
    ? (query = `SELECT
    op.productId,
    p.productName,
    SUM(op.subTotal) AS totalAmountOrdered
FROM
    ordered_products op
JOIN
    products p ON p.productId = op.productId
JOIN
    orders o ON o.orderId = op.orderId
WHERE
    p.cakeTypeId != 1
    AND o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
GROUP BY
    op.productId, p.productName
ORDER BY
    totalAmountOrdered DESC;`)
    : null;

  reportType == "addons"
    ? (query = `SELECT
    ca.addOnsId,
    ca.addOnsName,
    SUM(oa.addOnsQuantity) AS totalAddOnsQuantity
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
    totalAddOnsQuantity DESC;`)
    : null;

  reportType == "shape"
    ? (query = `SELECT
    op.shapeId,
    cs.shapeName,
    COUNT(*) AS totalOrders
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
    totalOrders DESC;`)
    : null;

  reportType == "flavor"
    ? (query = `SELECT
    op.flavorId,
    cf.flavorName,
    COUNT(*) AS totalOrders
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
    totalOrders DESC;`)
    : null;

  reportType == "packaging"
    ? (query = `SELECT
    op.packagingId,
    CONCAT(cp.size, ' (', p.productName, ')') AS productNameWithSize,
    COUNT(*) AS totalOrders
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
    totalOrders DESC;`)
    : null;

  reportType == "color"
    ? (query = `SELECT
    op.colorId,
    cc.colorName,
    COUNT(*) AS totalOrders
    FROM
    ordered_products op
    JOIN
    customization_colors cc ON cc.colorId = op.colorId
    JOIN
    orders o ON o.orderId = op.orderId
    WHERE
o.dateOrdered BETWEEN '${startDate}' AND '${endDate}'
    GROUP BY
    op.colorId, cc.colorName
    ORDER BY
    totalOrders DESC`)
    : null;

  console.log(query);

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

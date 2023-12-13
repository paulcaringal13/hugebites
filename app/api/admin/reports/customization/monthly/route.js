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
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  let query;

  reportType == "addons"
    ? (query = `SELECT
    YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    oa.addOnsId AS id,
    ca.addOnsName AS name,
    SUM(oa.addOnsQuantity) AS totalQuantity
FROM
    ordered_products_addons oa
JOIN
    customization_addons ca ON oa.addOnsId = ca.addOnsId
JOIN
    orders o ON oa.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
GROUP BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered), oa.addOnsId, ca.addOnsName
ORDER BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered);`)
    : null;

  reportType == "shape"
    ? (query = `SELECT
    YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    op.shapeId AS id,
    cs.shapeName AS name,
    SUM(op.quantity) AS totalQuantity
FROM
    ordered_products op
JOIN
    customization_shape cs ON op.shapeId = cs.shapeId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
GROUP BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered), op.shapeId, cs.shapeName
ORDER BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered);`)
    : null;

  reportType == "flavor"
    ? (query = `SELECT
    YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    op.flavorId AS id,
    cf.flavorName AS name,
    SUM(op.quantity) AS totalQuantity
FROM
    ordered_products op
JOIN
    customization_flavor cf ON op.flavorId = cf.flavorId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
GROUP BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered), op.flavorId, cf.flavorName
ORDER BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered);`)
    : null;

  reportType == "packaging"
    ? (query = `SELECT
    YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    op.packagingId AS id,
    CONCAT(cp.size, ' (', p.productName, ')') AS name,
    SUM(op.quantity) AS totalQuantity
FROM
    ordered_products op
    JOIN
    products p ON p.productId = op.productId
JOIN
    customization_packaging cp ON op.packagingId = cp.packagingId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
GROUP BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered), op.packagingId, cp.size
ORDER BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered);`)
    : null;

  reportType == "color"
    ? (query = `SELECT
    YEAR(o.dateOrdered) AS yearOrdered,
    MONTHNAME(o.dateOrdered) AS monthOrdered,
    op.colorId AS id,
    cc.colorName AS name,
    SUM(op.quantity) AS totalQuantity
FROM
    ordered_products op
JOIN
    customization_color cc ON op.colorId = cc.colorId
JOIN
    orders o ON op.orderId = o.orderId
WHERE
    YEAR(o.dateOrdered) = ${year}
    AND MONTH(o.dateOrdered) = ${month}
GROUP BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered), op.colorId, cc.colorName
ORDER BY
    YEAR(o.dateOrdered), MONTH(o.dateOrdered);`)
    : null;

  console.log(query);

  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

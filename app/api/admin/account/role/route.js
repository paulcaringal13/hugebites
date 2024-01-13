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

export const dynamic = "force-dynamic";

export async function GET() {
  const connection = await con();

  const query =
    "SELECT employee_role.roleName, employee_role.roleId FROM employee_role WHERE employee_role.isRoleRemoved=0";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const {
    roleName,
    dashboardAccess,
    menuAccess,
    orderAccess,
    customizationAccess,
    auditAccess,
    inventoryAccess,
    reportsAccess,
    forecastAccess,
    refundAccess,
    voucherAccess,
    accountsAccess,
  } = reqBody;

  try {
    const query = `INSERT INTO employee_role (roleName,
        dashboardAccess,
        menuAccess,
        ordersAccess,
        customizationAccess,
        auditAccess,
        inventoryAccess,
        reportsAccess,
        forecastAccess,
        refundAccess,
        voucherAccess,
        accountAccess) VALUES ('${roleName}',
        '${dashboardAccess}',
        '${menuAccess}',
        '${orderAccess}',
        '${customizationAccess}',
        '${auditAccess}',
        '${inventoryAccess}',
        '${reportsAccess}',
        '${forecastAccess}',
        '${refundAccess}',
        '${voucherAccess}',
        '${accountsAccess}')`;
    const results = await connection.execute(query, []);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

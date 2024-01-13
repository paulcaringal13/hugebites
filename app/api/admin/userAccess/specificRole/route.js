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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const roleId = searchParams.get("roleId");

  const query = `SELECT * FROM employee_role WHERE roleId=${roleId}`;
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

export async function PUT(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const {
      roleId,
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
      userRoleAccess,
    } = reqBody;

    const query = `UPDATE employee_role SET roleName = '${roleName}' , dashboardAccess = ${dashboardAccess} , menuAccess = ${menuAccess} , ordersAccess = ${orderAccess} , customizationAccess = ${customizationAccess} , auditAccess = ${auditAccess} , inventoryAccess = ${inventoryAccess} , reportsAccess = ${reportsAccess} , forecastAccess = ${forecastAccess} , refundAccess = ${refundAccess} , voucherAccess = ${voucherAccess} , accountAccess = ${accountsAccess}, userRoleAccess = ${userRoleAccess}  WHERE roleId = ${roleId}`;
    const results = await connection.execute(query);
    connection.end();

    console.log(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

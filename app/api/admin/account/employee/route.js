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
    "SELECT accounts.accountId, accounts.roleId, employee_role.roleName, accounts.avatar, tbl_employee.employeeId, tbl_employee.firstName, tbl_employee.lastName, accounts.email, accounts.username, accounts.contact, accounts.accountType, accounts.userRole, accounts.accStatus FROM tbl_employee LEFT JOIN accounts ON tbl_employee.accountId = accounts.accountId LEFT JOIN employee_role ON employee_role.roleId = accounts.roleId WHERE accounts.accountType = 0 ORDER BY accountId DESC";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

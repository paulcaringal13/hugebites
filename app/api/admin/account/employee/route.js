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
    "SELECT accounts.accountId, accounts.avatar, tbl_employee.employeeId, tbl_employee.firstName, tbl_employee.lastName, accounts.email, accounts.username, accounts.contact, accounts.accountType, accounts.userRole, accounts.accStatus FROM tbl_employee LEFT JOIN accounts ON tbl_employee.accountId = accounts.accountId WHERE accounts.userRole IN ('Sub Admin', 'Employee');";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

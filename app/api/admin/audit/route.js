import mysql from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

// CUSTOMER

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

// GET ALL DATA TO FILL UP THE AUDIT TABLE
export async function GET() {
  const connection = await con();

  const query = `SELECT audit.accountId, audit.timeIn, audit.timeOut, accounts.userRole, audit.employeeId, tbl_employee.firstName, tbl_employee.lastName FROM audit LEFT JOIN tbl_employee ON tbl_employee.employeeId = audit.employeeId LEFT JOIN accounts ON accounts.accountId = audit.accountId ORDER BY auditId DESC`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

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

// GET THE DATA OF THE USER LOGGING IN TO TBL_EMPLOYEES
export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  const query = `SELECT accounts.isDeactivated, accounts.accountId, accounts.accountType, accounts.email, accounts.username, accounts.password, accounts.userRole, tbl_employee.employeeId, tbl_employee.firstName, tbl_employee.lastName FROM accounts INNER JOIN tbl_employee ON accounts.accountId = tbl_employee.accountId WHERE accounts.accountId = ${accountId}`;
  const res = await connection.execute(query);
  connection.end();

  console.log(query);

  const results = res[0];

  return NextResponse.json(results);
}

// UPDATE LOG OUT COLUMN
export async function PUT(req) {
  try {
    const connection = await con();

    const { searchParams } = new URL(req.url);
    const auditId = searchParams.get("auditId");

    const reqBody = await req.json();
    const { timeOut } = reqBody;

    const query = `UPDATE audit SET timeOut ='${timeOut}' WHERE auditId = ${auditId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

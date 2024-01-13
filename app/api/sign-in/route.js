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

// FOR SIGN IN BOTH NI EMPLOYEE AND ADMINS. BINABALIK NITO YUNG ACCOUNT ID PARA MAGAMIT FOR GETTING THEIR NAMES ON TBL_EMPLOYEES
export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  const query = `SELECT accountId FROM accounts WHERE email = '${username}' OR username='${username}' AND password='${password}' AND accountType =0;`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];
  console.log(query);

  return NextResponse.json(results);
}

// IRECORD ANG LOG IN DETAILS NI EMPLOYEE OR SUB ADMIN SA TABLE AUDIT
export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { accountId, employeeId, timeIn, timeOut } = reqBody;

    const query = `INSERT INTO audit ( accountId, employeeId, timeIn, timeOut  ) VALUES ('${accountId}', '${employeeId}', '${timeIn}', '${timeOut}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results[0]);
  } catch (error) {
    console.log(error);
  }
}

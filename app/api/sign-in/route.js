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

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  const query = `SELECT * FROM tbl_customer WHERE username = '${username}' AND password = '${password}'`; // change accountID
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];
  console.log(results);

  return NextResponse.json(results);
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { employeeId, timeIn, timeOut } = reqBody;

    const query = `INSERT INTO audit ( employeeId, timeIn, timeOut  ) VALUES ('${employeeId}', '${timeIn}', '${timeOut}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results[0]);
  } catch (error) {
    console.log(error);
  }
}

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

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

export async function GET() {
  const connection = await con();

  const query =
    "SELECT adminId AS accountId, firstName, lastName, email, username, password, address, contact, accountType, accStatus FROM tbl_admin UNION SELECT employeeId AS accountId, firstName, lastName, email, username, password, address, contact, accountType, accStatus FROM tbl_employee UNION SELECT customerId AS accountId, firstName, lastName, email, username, password, address, contact, accountType, accStatus FROM tbl_customer";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json({ results: results[0] });
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      contact,
      accountType,
      accStatus,
    } = reqBody;

    const tableName = accountType == "Sub Admin" ? "tbl_admin" : "tbl_employee";

    const query = `INSERT INTO ${tableName} (firstName, lastName, email, password, address, contact, accountType, accStatus ) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${address}', '${contact}', '${accountType}', '${accStatus}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

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
    "SELECT adminId AS accountId, firstName, lastName, email, username, password, address, contact, accountType FROM tbl_admin UNION SELECT employeeId AS accountId, firstName, lastName, email, username, password, address, contact, accountType FROM tbl_employee UNION SELECT customerId AS accountId, firstName, lastName, email, username, password, address, contact, accountType FROM tbl_customer";
  const results = await connection.execute(query, []);
  connection.end();

  console.log(results[0]);

  return NextResponse.json({ results: results[0] });
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { firstName, lastName, email, password, age, contact, accountType } =
      reqBody;

    const query = `INSERT INTO accounts (firstName, lastName, email, password, age, contact, accountType ) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${age}', '${contact}', '${accountType}')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

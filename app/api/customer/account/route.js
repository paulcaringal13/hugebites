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
  const customerId = searchParams.get("customerId");

  const query = `SELECT accounts.accountId, tbl_customer.customerId, accounts.avatar, accounts.email,accounts.username, accounts.contact, accounts.userRole, tbl_customer.customerId, tbl_customer.firstName, tbl_customer.lastName, tbl_customer.address, tbl_customer.totalSpent FROM tbl_customer LEFT JOIN accounts ON accounts.accountId = tbl_customer.accountId WHERE tbl_customer.customerId = ${customerId}`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0][0];

  return NextResponse.json({ accountInfo: results });
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { firstName, lastName, email, password, age, contact } = reqBody;

    const query = `INSERT INTO accounts (firstName, lastName, email, password, age, contact, accountType ) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${age}', '${contact}', 'Customer')`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  try {
    const connection = await con();

    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");

    const reqBody = await req.json();
    const { firstName, lastName, email, password, age, contact } = reqBody;

    const query = `UPDATE accounts SET firstName ='${firstName}', lastName ='${lastName}', email ='${email}', password='${password}', age ='${age}', contact ='${contact}' WHERE accountId = ${accountId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

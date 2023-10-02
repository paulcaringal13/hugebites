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

export async function PUT(request) {
  try {
    const connection = await con();

    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    const reqBody = await request.json();
    const { email, contact, userRole } = reqBody;

    const query = `UPDATE accounts SET email ='${email}', contact ='${contact}', userRole ='${userRole}' WHERE accountId = ${accountId}`;
    const results = await connection.execute(query);
    connection.end();

    console.log(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

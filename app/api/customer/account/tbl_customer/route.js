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

export async function PUT(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { firstName, lastName, accountId } = reqBody;

    const query = `UPDATE tbl_customer SET firstName ='${firstName}', lastName ='${lastName}' WHERE accountId = ${accountId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results[0]);
  } catch (error) {
    console.log(error);
  }
}

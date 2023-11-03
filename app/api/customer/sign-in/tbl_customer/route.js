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

// GET ALL CUSTOMER ACCOUNTS FROM ACCOUNTS TABLE FOR SIGN IN PURPOSES REFERENCE
export async function GET(request) {
  const connection = await con();

  const query = `SELECT * FROM tbl_customer`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

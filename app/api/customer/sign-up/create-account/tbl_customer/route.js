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

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { accountId, firstName, lastName, address, accStatus } = reqBody;
  try {
    const query = `INSERT INTO tbl_customer (accountId, firstName, lastName, address, accStatus ) VALUES ('${accountId}', '${firstName}', '${lastName}', '${address}', '${accStatus}')`;
    const results = await connection.execute(query, []);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

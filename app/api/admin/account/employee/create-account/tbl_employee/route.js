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

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  const connection = await con();

  const reqBody = await req.json();
  const { accountId, firstName, lastName } = reqBody;
  try {
    const query = `INSERT INTO tbl_employee (accountId, firstName, lastName ) VALUES ('${accountId}', '${firstName}', '${lastName}')`;
    const results = await connection.execute(query, []);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

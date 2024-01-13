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

export async function GET(req) {
  const connection = await con();

  const { searchParams } = new URL(req.url);
  const roleId = searchParams.get("roleId");

  const query = `SELECT * FROM employee_role WHERE roleId = ${roleId}`;
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

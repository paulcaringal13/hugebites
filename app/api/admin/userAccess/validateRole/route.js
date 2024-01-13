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

export async function GET() {
  const connection = await con();

  const query =
    "SELECT employee_role.roleId, employee_role.isRoleRemoved FROM employee_role";
  const results = await connection.execute(query, []);
  connection.end();

  return NextResponse.json(results[0]);
}

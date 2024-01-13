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

export async function PUT(req) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { roleId, isRoleRemoved } = reqBody;

    const query = `UPDATE employee_role SET isRoleRemoved = ${isRoleRemoved} WHERE roleId = ${roleId}`;
    const results = await connection.execute(query);
    connection.end();

    console.log(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

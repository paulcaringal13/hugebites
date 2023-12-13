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

export async function POST(request, path) {
  const connection = await con();

  const reqBody = await request.json();

  const {
    email,
    password,
    username,
    contact,
    accountType,
    userRole,
    isDeactivated,
    accStatus,
  } = reqBody;
  try {
    const query = `INSERT INTO accounts ( email, password, username, contact, accountType, userRole, isDeactivated, accStatus) VALUES ('${email}', '${password}', '${username}', '${contact}', '${accountType}', '${userRole}', '${isDeactivated}', '${accStatus}')`;
    const results = await connection.execute(query, []);
    connection.end();
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

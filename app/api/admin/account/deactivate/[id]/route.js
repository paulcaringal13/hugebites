import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export async function PUT(req, path) {
  try {
    const connection = await con();

    const { id } = path.params;

    const reqBody = await req.json();
    const { accountType, accStatus, isDeactivated } = reqBody;

    const tableName = accountType == "Sub Admin" ? "tbl_admin" : "tbl_employee";
    const tableIdName = accountType == "Sub Admin" ? "adminId" : "employeeId";

    const query = `UPDATE ${tableName} SET isDeactivated = '${isDeactivated}', accStatus = '${accStatus}' WHERE ${tableIdName} = ${id}`;

    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

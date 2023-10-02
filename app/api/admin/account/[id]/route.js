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
    const { firstName, lastName, email, address, contact, accountType } =
      reqBody;

    const tableName = accountType == "Sub Admin" ? "tbl_admin" : "tbl_employee";
    const tableIdName = accountType == "Sub Admin" ? "adminId" : "employeeId";

    const query = `UPDATE ${tableName} SET firstName ='${firstName}', lastName ='${lastName}', email ='${email}', address ='${address}', contact ='${contact}', accountType ='${accountType}' WHERE ${tableIdName} = ${id}`;
    const results = await connection.execute(query);
    connection.end();

    // console.log(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req, path) {
  try {
    const connection = await con();

    const { id } = path.params;

    console.log(path);

    const query = `DELETE FROM accounts WHERE accountId = ${id}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dayjs from "dayjs";

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const { customerId, totalSpent } = reqBody;

    const query = `UPDATE tbl_customer SET totalSpent ='${totalSpent}' WHERE customerId = ${customerId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

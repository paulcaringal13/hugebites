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

// FOR EMPLOYEE
export async function PUT(req, path) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const { categoryId, isRemoved } = reqBody;

    const query = `UPDATE product_categories SET isRemoved ='${isRemoved}' WHERE categoryId = ${categoryId}`;
    const results = await connection.execute(query);
    connection.end();

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

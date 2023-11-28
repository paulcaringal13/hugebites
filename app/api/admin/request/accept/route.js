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

export async function PUT(request) {
  try {
    const connection = await con();

    const reqBody = await request.json();
    const {
      customerRequestId,
      moneyRefunded,
      responseMessage,
      responseImage,
      requestStatus,
      isAccepted,
    } = reqBody;

    const query = `UPDATE customer_request SET moneyRefunded ='${moneyRefunded}', isAccepted='${isAccepted}', requestStatus='${requestStatus}', responseMessage ='${responseMessage}', responseImage='${responseImage}' WHERE customerRequestId = ${customerRequestId}`;

    const results = await connection.execute(query);
    connection.end();
    console.log(query);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
  }
}

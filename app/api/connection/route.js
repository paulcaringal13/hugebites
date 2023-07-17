import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const connection = await mysql.createConnection({
        host:"localhost", 
        database: "hugebites",
        user: "root",
    });

    const query = "SELECT * FROM accounts";
    const data = await connection.execute(query, []);
    connection.end();

  return NextResponse.json({ results: data[0] });
}
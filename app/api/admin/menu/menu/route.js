// import { NextRequest, NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// async function con() {
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     database: "hugebites",
//     user: "root",
//   });

//   return connection;
// }

// export async function GET() {
//   const connection = await con();

//   const query = `SELECT * FROM menu`;
//   const results = await connection.execute(query);
//   connection.end();

//   return NextResponse.json({ results: results });
// }

// export async function POST(request) {
//   const connection = await con();

//   const reqBody = await request.json();
//   const { menuName } = reqBody;

//   const query = `INSERT INTO menu (menuName) VALUES ('${menuName}')`;
//   const results = await connection.execute(query);
//   connection.end();

//   return NextResponse.json(results);
// }

// export async function PUT(req, path) {
//   try {
//     const connection = await con();

//     const reqBody = await req.json();
//     const { menuId, menuName } = reqBody;

//     const query = `UPDATE menu SET menuName ='${menuName}' WHERE menuId = ${menuId}`;
//     const results = await connection.execute(query);
//     connection.end();

//     return NextResponse.json(results);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function DELETE(request) {
//   const connection = await con();

//   const reqBody = await request.json();
//   const { menuId } = reqBody;

//   const query = `DELETE FROM menu WHERE menuId = ${menuId}`;
//   const results = await connection.execute(query);
//   connection.end();

//   return NextResponse.json(results);
// }

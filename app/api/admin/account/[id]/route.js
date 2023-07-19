import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// example usage: GET item by id, with query param

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

    // console.log(req);
    // console.log(path);
    // console.log(path.params);

    const { id } = path.params;

    const reqBody = await req.json();
    const { firstName, lastName, email, age, contact, accountType } = reqBody;
    console.log(`ako si ${id}`);

    const query = `UPDATE accounts SET firstName ='${firstName}', lastName ='${lastName}', email ='${email}', age ='${age}', contact ='${contact}', accountType ='${accountType}' WHERE id = ${id}`;
    const results = await connection.execute(query);
    connection.end();
    // results: results[0]

    console.log("reqBody:", reqBody);
    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req, path) {
  try {
    const connection = await con();

    // console.log(req);
    // console.log(path);
    // console.log(path.params);

    const { id } = path.params;

    // const reqBody = await req.json();
    // const { firstName, lastName, email, age, contact, accountType } = reqBody;
    console.log(`ako si ${id}`);
    console.log(`deleted successfully!`);

    const query = `DELETE FROM accounts WHERE id = ${id}`;
    const results = await connection.execute(query);
    connection.end();
    // results: results[0]

    // console.log("reqBody:", reqBody);
    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);
  }
}

// export async function GET(request, path) {
//   // path params api/test/:id
//   const { params } = path;
//   const id = params.id;

//   // query params api/test/:id?name=<value>
//   const { searchParams } = new URL(request.url);
//   const x = searchParams.get("firstName");
//   console.log("tinawag ako");
//   console.log(request.json());
//   console.log(x);

//   return NextResponse.json({
//     results: {
//       id: id,
//       firstName: x,
//     },
//   });
// }

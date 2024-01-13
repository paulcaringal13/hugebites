import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// COMPLETED

async function con() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export const dynamic = "force-dynamic";

export async function GET(request) {
  const connection = await con();

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  const query = `SELECT selected_accounts.*, selected_accounts.accountId AS account_accountId, selected_accounts.customer_accountId AS customer_accountId
  FROM (
      SELECT accounts.*, tbl_customer.totalSpent, tbl_customer.firstName, tbl_customer.lastName, tbl_customer.customerId, tbl_customer.accountId AS customer_accountId, accounts.isVerified AS customer_isVerified
      FROM accounts
      JOIN tbl_customer ON accounts.accountId = tbl_customer.accountId
      WHERE (accounts.email = '${username}' OR accounts.username = '${username}')
        AND accounts.password = PASSWORD('${password}')
        AND accounts.accountType = '1'
  ) AS selected_accounts
  WHERE selected_accounts.customer_isVerified = 1 AND selected_accounts.isDeactivated = 0;`;
  const res = await connection.execute(query);
  connection.end();

  const results = res[0];

  return NextResponse.json(results);
}

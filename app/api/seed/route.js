// pages/api/seed.js
import { NextApiRequest, NextApiResponse } from "next";

async function connect() {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "hugebites",
    user: "root",
  });

  return connection;
}

export default async function handler(NextApiRequest, NextApiResponse) {
  if (req.method === "POST") {
    try {
      const db = await connect();

      // Your seeder logic here

      // Example: Insert dummy data into accounts table
      const accountsQuery = `
        INSERT INTO accounts (email, username, password, contact, accountType, userRole, accStatus, isDeactivated, avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const accountsData = [
        // Your dummy data here
        [
          "user1@example.com",
          "user1",
          "password1",
          "1234567890",
          "standard",
          "user",
          "active",
          0,
          "avatar1.jpg",
        ],
        // ...
      ];

      // Execute the SQL query for each row of data
      for (const data of accountsData) {
        await db.query(accountsQuery, data);
      }

      res.status(200).json({ message: "Seeding completed" });
    } catch (error) {
      console.error("Seeding error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}

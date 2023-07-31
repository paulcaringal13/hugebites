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

export async function GET(request, path) {
  const connection = await con();

  const query = `SELECT * FROM products INNER JOIN product_categories ON products.categoryId = product_categories.categoryId`;
  const results = await connection.execute(query);
  connection.end();

  console.log(results);

  return NextResponse.json({ results: results });
}

export async function POST(req, res) {
  try {
    const connection = await con();

    const reqBody = await req.json();
    const {
      totalPrice,
      flavor,
      packaging,
      dragees,
      shape,
      darkColoredBase,
      freshFlowers,
      quantity,
    } = reqBody;

    const query = `INSERT INTO test_table (totalPrice, flavor, packaging, dragees, shape, darkColoredBase, freshFlowers, quantity) VALUES ('${totalPrice}', '${flavor}' '${packaging}', '${dragees}' '${shape}', '${darkColoredBase}' '${freshFlowers}', '${quantity}')`;
    const results = await connection.execute(query);
    connection.end();
    // results: results[0]

    console.log("result =>", results[0]);

    console.log("reqBody:", reqBody);
    return NextResponse.json({ reqBody });
  } catch (error) {
    console.log(error);
  }
}

// const products = [
//   {
//     id: 1,
//     productName: "Bordered Cake",
//     price: "₱250",
//     description:
//       "A fusion of culinary art and irresistible taste, meticulously handcrafted to elevate your celebrations to a whole new level.",
//     image: "image link",
//   },
//   {
//     id: 2,
//     productName: "Floral Patterned",
//     price: "₱400",
//     description:
//       "Indulge in the enchanting allure of our Floral Patterned Cake, a delightful creation that combines the artistry of nature with the decadence of exquisite flavors.",
//     image: "image link",
//   },
//   {
//     id: 3,
//     productName: "Gradient Cake",
//     price: "₱300",
//     description:
//       "Make your celebration truly special with a customized Gradient Cake. Whether you desire a soft pastel gradient or a vibrant burst of colors, our skilled pastry chefs will create a bespoke masterpiece that perfectly matches your event's theme and style. Your Gradient Cake will be as unique as you are, leaving a lasting impression on your guests.",
//     image: "image link",
//   },
//   {
//     id: 4,
//     productName: "Minimalist",
//     price: "₱200",
//     description:
//       "Experience the beauty of understated elegance with our exquisite Minimalist Cake, where less is truly more, and every element is thoughtfully crafted to perfection.",
//     image: "image link",
//   },
//   {
//     id: 5,
//     productName: "Smudges",
//     price: "₱200",
//     description:
//       "Step into a world of playful creativity with our delightful Smudges Cake, a unique and charming creation that brings together artful smudges and irresistible flavors.",
//     image: "image link",
//   },
// ];

// return NextResponse.json({ results: products });

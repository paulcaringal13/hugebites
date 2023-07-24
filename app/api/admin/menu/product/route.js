import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: 1,
      productName: "Bordered Cake",
      price: "₱250",
      description:
        "A fusion of culinary art and irresistible taste, meticulously handcrafted to elevate your celebrations to a whole new level.",
      image: "image link",
    },
    {
      id: 2,
      productName: "Floral Patterned",
      price: "₱400",
      description:
        "Indulge in the enchanting allure of our Floral Patterned Cake, a delightful creation that combines the artistry of nature with the decadence of exquisite flavors.",
      image: "image link",
    },
    {
      id: 3,
      productName: "Gradient Cake",
      price: "₱300",
      description:
        "Make your celebration truly special with a customized Gradient Cake. Whether you desire a soft pastel gradient or a vibrant burst of colors, our skilled pastry chefs will create a bespoke masterpiece that perfectly matches your event's theme and style. Your Gradient Cake will be as unique as you are, leaving a lasting impression on your guests.",
      image: "image link",
    },
    {
      id: 4,
      productName: "Minimalist",
      price: "₱200",
      description:
        "Experience the beauty of understated elegance with our exquisite Minimalist Cake, where less is truly more, and every element is thoughtfully crafted to perfection.",
      image: "image link",
    },
    {
      id: 5,
      productName: "Smudges",
      price: "₱200",
      description:
        "Step into a world of playful creativity with our delightful Smudges Cake, a unique and charming creation that brings together artful smudges and irresistible flavors.",
      image: "image link",
    },
  ];

  return NextResponse.json({ results: products });
}

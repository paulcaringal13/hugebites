import { NextRequest, NextResponse } from "next/server";

// Next 12 old way
// export default async function handler(req, res) {
//   res.status(200).json({ results: "hello world" });
// }

export async function GET() {
  const users = [
    {
      id: 1,
      name: "Leanne Graham",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
      },
    },
  ];

  return NextResponse.json({ results: users });
}

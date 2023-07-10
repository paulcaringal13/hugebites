import { NextRequest, NextResponse } from "next/server";

// Next 12 old way
// export default async function handler(req, res) {
//   res.status(200).json({ results: "hello world" });
// }

// example usage: GET item by id, with query param
export async function GET(request, path) {
  // path params api/test/:id
  const { params } = path;
  const id = params.id;

  // query params api/test/:id?name=<value>
  const { searchParams } = new URL(request.url);
  const x = searchParams.get("name");

  return NextResponse.json({
    results: {
      id: id,
      name: x,
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailAdmin = "hugebitesofficial@gmail.com";
const emailCS = "hugebitesservice@gmail.com";

const transporterAdmin = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailAdmin,
    pass: "txzf bxie wvcd krli",
  },
});

const transporterCS = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailCS,
    pass: "hoee rtgi nngo qgsx",
  },
});

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const { from, to, ...rest } = reqBody;
    const isFromAdmin = from === "admin";

    if (isFromAdmin) {
      await transporterAdmin.sendMail({
        from: emailAdmin,
        to,
        ...rest,
      });
    } else {
      await transporterCS.sendMail({
        from: emailCS,
        to: emailAdmin,
        ...rest,
      });
    }

    return NextResponse.json({ status: "sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

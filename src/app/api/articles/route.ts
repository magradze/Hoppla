import prisma from "@/lib/prisma";
import articleSchema from "@/lib/validation/ArticleSchema";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const rides = await prisma.ride.findMany({
//             include: {
//                 driver: true,
//                 stops: true
//             }
//         });
//         return NextResponse.json(rides);
//     } catch (err) {
//         return NextResponse.json({error: err});
//     }
// }

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    // const ride = await prisma.ride.create({
    //   data: {},
    // });
    const values = articleSchema.parse(body);
    console.log(values);
    return NextResponse.json({
      id: "ss",
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

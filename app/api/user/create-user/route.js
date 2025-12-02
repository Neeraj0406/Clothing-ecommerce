import { NextResponse } from "next/server";

export async function POST(request, response){
  return NextResponse.json({ message: "api is working" }, { status: 201 });
}
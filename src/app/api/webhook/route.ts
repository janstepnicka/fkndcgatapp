import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Process the chat message here
  const response = { message: "This is a response from the API" };
  return NextResponse.json(response);
}
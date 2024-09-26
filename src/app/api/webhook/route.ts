import { NextResponse } from 'next/server';

export async function POST() {
  // const body = await req.json();
  // Process the chat message here
  const response = { message: "This is a response from the API" };
  return NextResponse.json(response);
}

export async function GET() {
    // Process the chat message here
    const response = {message: "This is a response from the API"};
    return NextResponse.json(response);
}
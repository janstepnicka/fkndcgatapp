import { NextRequest, NextResponse } from 'next/server';

// Define environment variables
// const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'mrdka';

// Type definitions for incoming data
interface MessengerWebhookEntry {
  id: string;
  time: number;
  messaging: Array<{
    sender: { id: string };
    recipient: { id: string };
    timestamp: number;
    message?: {
      mid: string;
      text: string;
    };
  }>;
}

interface MessengerWebhookBody {
  object: string;
  entry: MessengerWebhookEntry[];
}

// Handle GET request for webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  return NextResponse.json(challenge, { status: 200 });

  // if (mode && token) {
  //   if (mode === 'subscribe' && token === VERIFY_TOKEN) {
  //     console.log('WEBHOOK VERIFIED');
  //     return NextResponse.json(challenge, { status: 200 });
  //   } else {
  //     return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  //   }
  // }
  //
  // return NextResponse.json({ message: 'Bad Requesxcvxvct' }, { status: 400 });
}

// Handle POST request for incoming messages
export async function POST(req: NextRequest) {
  const body: MessengerWebhookBody = await req.json();

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const messagingEvent = entry.messaging[0];
      console.log('Incoming message:', messagingEvent.message?.text);

      // Handle message logic here (e.g., pin messages, or handle specific commands)
      if (messagingEvent.message && messagingEvent.message.text === '/pin') {
        console.log('Pinning message:', messagingEvent.message.text);
      }
    });

    // Return a '200 OK' response to Facebook
    return NextResponse.json({ message: 'EVENT_RECEIVED' }, { status: 200 });
  } else {
    // Return a '404 Not Found' if the event isn't from a page subscription
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }
}

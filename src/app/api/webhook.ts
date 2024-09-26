import type { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Webhook verification
    const VERIFY_TOKEN = "mrdka";

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK VERIFIED');
        return res.status(200).send(challenge);
      } else {
        return res.status(403).end('Verification failed');
      }
    }
  } else if (req.method === 'POST') {
    // Handle incoming webhook events from Facebook Messenger
    const body: MessengerWebhookBody = req.body;

    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        const messagingEvent = entry.messaging[0];
        console.log('Incoming message:', messagingEvent.message?.text);

        // Here you can handle message events, e.g., store pinned messages
        // or trigger an action when specific commands are detected
        if (messagingEvent.message && messagingEvent.message.text === '/pin') {
          // Logic for pinning the message
          console.log('Pinning message:', messagingEvent.message.text);
        }
      });

      // Return a '200 OK' response to Facebook
      return res.status(200).send('EVENT_RECEIVED');
    } else {
      // Respond with a '404 Not Found' if the event isn't from a page subscription
      return res.status(404).end();
    }
  } else {
    // Respond with '405 Method Not Allowed' for non-GET/POST requests
    return res.status(405).end('Method Not Allowed');
  }
}


// pages/api/webhook.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Verify webhook subscription (Facebook will ping this URL when setting up the webhook)
    const VERIFY_TOKEN = "mrdka"; // Store your token in env vars
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK VERIFIED');
        res.status(200).send(challenge);
      } else {
        res.status(403).end();
      }
    }
  } else if (req.method === 'POST') {
    // Handle incoming messages from Facebook
    const body = req.body;

    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        const webhookEvent = entry.messaging[0];
        console.log('Incoming message:', webhookEvent);

        // You can handle message events here, e.g., pin messages based on commands
      });
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.status(404).end();
    }
  } else {
    res.status(405).end();
  }
}

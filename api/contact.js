export const config = {
  api: {
    bodyParser: true,
  },
};

const rateLimit = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Rate limiting (basic in-memory per-lambda instance)
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  if (ip !== 'unknown') {
    const requestData = rateLimit.get(ip) || { count: 0, startTime: now };
    
    if (now - requestData.startTime > windowMs) {
      // Reset window
      requestData.count = 1;
      requestData.startTime = now;
    } else {
      requestData.count += 1;
      if (requestData.count > maxRequests) {
        return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
      }
    }
    rateLimit.set(ip, requestData);
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Valid email is required' });
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ success: false, message: 'Message must not exceed 1000 characters' });
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    console.error('Missing Telegram credentials');
    return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  const formattedMessage = `-------------------------------
${name}
${email}
"${message}"
-------------------------------`;

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: formattedMessage,
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API responded with ${telegramResponse.status}`);
    }

    return res.status(200).json({ success: true, message: 'Message delivered' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
}

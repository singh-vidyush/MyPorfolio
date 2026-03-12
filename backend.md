# Backend Specification

## Overview

The portfolio website requires a minimal backend whose only responsibility is to process contact form submissions and forward the message to the owner's Telegram account.

No database must be used.

Messages should be sent directly to Telegram using the Telegram Bot API.

The backend should simply receive form data, format the message, send it to Telegram, and return a success response.

---

# Backend Goals

The backend must:

1. Receive contact form submissions.
2. Extract the following fields:
   - name
   - email
   - message
3. Format the message in a structured way.
4. Send the message to a Telegram chat.
5. Return a success response to the frontend.

The backend should not:

- store any data
- use a database
- maintain sessions
- require authentication

This backend exists solely as a message relay service.

---

# Tech Stack

Backend Runtime:
Node.js

Deployment:
Serverless function

Recommended deployment platforms:

Vercel  
Netlify  
Cloudflare Workers

Preferred platform:
Vercel serverless functions.

---

# Messaging Service

Messages must be sent using the Telegram Bot API.

Required components:

Telegram Bot Token  
Telegram Chat ID

These values must be stored as environment variables.

Environment variables:

TELEGRAM_BOT_TOKEN  
TELEGRAM_CHAT_ID

---

# Contact API Endpoint

API Route:

/api/contact

HTTP Method:

POST

Content-Type:

application/json

---

# Request Body Format

The frontend will send the following JSON payload:

{
  "name": "John Doe",
  "email": "john@email.com",
  "message": "Hello, I liked your portfolio."
}

---

# Validation Rules

The backend must validate:

name
email
message

Rules:

Name must not be empty.

Email must be valid format.

Message must not be empty.

Maximum message length:

1000 characters.

If validation fails, return HTTP 400.

---

# Telegram Message Format

The message sent to Telegram must follow this format exactly:

-------------------------------
NAME
EMAIL
".........Message........"
-------------------------------

Example message:

-------------------------------
John Doe
john@email.com
"Hello Vidyush, I saw your portfolio and wanted to connect."
-------------------------------

The backend must construct this message dynamically using the submitted data.

---

# Telegram API Integration

The backend must send the formatted message to Telegram using the Telegram Bot API endpoint:

https://api.telegram.org/bot8777331558:AAGgMd66Lma7wEc35-6P7shXU597PP3w67o/sendMessage

Request method:

POST

Request body:

{
  "chat_id": "1029761211",
  "text": "<formatted_message>"
}

---

# Response Format

If message sending succeeds:

Return HTTP 200.

Response JSON:

{
  "success": true,
  "message": "Message delivered"
}

If message sending fails:

Return HTTP 500.

Response JSON:

{
  "success": false,
  "message": "Failed to send message"
}

---

# Frontend Interaction

The frontend contact form will send a POST request to:

/api/contact

When the backend returns success, the frontend must display a confirmation popup.

---

# Success Popup Behavior

After the user clicks the "Send Message" button:

1. The frontend sends the form data to the backend.
2. If the response is successful, a popup notification appears.

Popup text:

"Message has been sent, Vidyush will respond soon..."

Popup position:

Top center of the screen.

Popup visibility duration:

5 seconds.

After 5 seconds the popup automatically disappears.

---

# Popup UI Requirements

The popup should:

appear with a smooth animation  
fade out after 5 seconds  
not block the page interaction  

Suggested styling:

background: rgb(77, 144, 219)  
text color: white  
rounded corners  
soft shadow

---

# Security Considerations

The backend must include:

basic input validation  
rate limiting protection if possible  

Recommended limits:

Maximum 5 requests per minute per IP.

This helps prevent spam submissions.

---

# Error Handling

If the Telegram API fails:

Return HTTP 500 response.

Frontend should display a fallback message:

"Something went wrong. Please try again later."

---

# Logging

Server logs may include:

timestamp  
request status  
error messages

However, user messages must not be stored permanently.

---

# Scalability

Because this backend is serverless and stateless, it can scale automatically.

No infrastructure management is required.

---

# Summary

The backend is a minimal message relay service.

Flow:

User submits form  
→ frontend sends POST request  
→ serverless function receives data  
→ formats Telegram message  
→ sends message via Telegram Bot API  
→ backend returns success response  
→ frontend displays confirmation popup
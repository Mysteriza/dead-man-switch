# Dead Man Switch

![GitHub](https://img.shields.io/badge/license-MIT-blue)  ![GitHub](https://img.shields.io/badge/status-active-brightgreen)

**Dead Man Switch** is a web application that allows users to set a timer that will automatically send a message via email if the user fails to "check-in" within the specified time. This application is useful for ensuring that important information is delivered even if the user is unable to do so manually.

---

## Key Features

- **Timer with Countdown**: Set a timer with a specific duration or a specific time.
- **Check-In**: Perform a check-in to reset the timer.
- **Automatic Sending**: If the timer runs out, the application will automatically send a message.
- **Email Support**: Send messages via email (using SendGrid).
- **Password Check-In**: Add an extra layer of security with a check-in password and an emergency password.
- **Custom Interval**: Set the check-in interval manually (seconds, minutes, hours, days, weeks, or months).
- **File Attachment**: Send files as message attachments.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Email Service**: SendGrid
- **WhatsApp Service**: Twilio API for WhatsApp
- **Environment Management**: dotenv

---

## How to Use

### Prerequisites

1. **Node.js**: Ensure Node.js is installed on your system. Download it from [here](https://nodejs.org/).
2. **SendGrid Account**: To send emails, sign up at [SendGrid](https://sendgrid.com/).
3. **Twilio Account**: To send WhatsApp messages, sign up at [Twilio](https://www.twilio.com/).

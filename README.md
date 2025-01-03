# Dead Man Switch

![GitHub](https://img.shields.io/badge/license-MIT-blue)  ![GitHub](https://img.shields.io/badge/status-active-brightgreen)

**Dead Man Switch** is a web application that allows users to set a timer that will automatically send a message, instruction, or something important to tell your family or loved ones via email if the user fails to "check-in" within the specified time (presumed dead or kidnapped by the government or terrorists). This application is useful for ensuring that important information is delivered even if the user is unable to do so manually.

Example (The email will be sent to my personal email address):
[Dead Man Switch](https://dead-man-switch.vercel.app)

- Default Password: password123
- Emergency Password: emergency456
---

## Key Features

- **Timer with Countdown**: Set a timer with a specific duration or a specific time.
- **Check-In**: Perform a check-in to reset the timer.
- **Automatic Sending**: If the timer runs out, the application will automatically send a message.
- **Email Support**: Send messages via email (using FormSubmit).
- **Password Check-In**: Add an extra layer of security with a check-in password and an emergency password.
- **Custom Interval**: Set the check-in interval manually (seconds, minutes, hours, days, weeks, or months).
- **File Attachment**: Send files as message attachments (Currently not working).

As a reference, the "default password" is the one you use to check-in or stop the timer. Meanwhile, the "emergency password" is used when you are under pressure. In this case, if you are coerced or forced by kidnappers to stop the timer, you can enter the emergency password to instantly send the information or message without waiting for the timer to expire.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Tailwind CSS
- **Email Service**: FormSubmit

---

## How to Use
1. Clone this repository
```
git clone https://github.com/Mysteriza/dead-man-switch
```
```
cd dead-man-switch
```
2. Replace the email with your own email address in the script.js file (line 171).
3. Replace the random-like code with your own email address in the index.html file (line 20)
4. Then run it with a local server to ensure the email function works properly. Or you can host it to Vercel.

<img src="https://github.com/user-attachments/assets/33c38555-1964-4a2d-bc13-792f407d9000" alt="image" width="400" />



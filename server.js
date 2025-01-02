require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sgMail = require("@sendgrid/mail"); // Import SendGrid

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint untuk root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Konfigurasi SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Hard-coded email penerima (ProtonMail)
const RECIPIENTS = ["mysteriza@proton.me"];

// Endpoint untuk mengirim email
app.post("/send-action", (req, res) => {
  const { text, filename, fileContent } = req.body;

  // Validasi data
  if (!text && !filename) {
    return res.status(400).send("Tidak ada tindakan yang ditentukan.");
  }

  // Konversi ArrayBuffer ke Buffer
  let attachment = null;
  if (filename && fileContent) {
    try {
      attachment = {
        content: Buffer.from(new Uint8Array(fileContent.data)).toString(
          "base64"
        ), // Konversi ke base64
        filename,
        type: "application/octet-stream", // Tipe file default
        disposition: "attachment",
      };
    } catch (error) {
      console.error("Error converting file content:", error);
      return res.status(500).send("Gagal memproses file.");
    }
  }

  const msg = {
    to: RECIPIENTS, // Email penerima (ProtonMail)
    from: process.env.SENDER_EMAIL, // Email pengirim (harus terverifikasi di SendGrid)
    subject: "Dead Man Switch Action Triggered",
    text: text || "No action text provided.",
    attachments: attachment ? [attachment] : [],
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
      res.status(200).send("Email sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email.");
    });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

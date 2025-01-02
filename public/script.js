let timer;
let timeLeft;
let isRunning = false;
let interval;
let stopTime = null;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const checkinBtn = document.getElementById("checkinBtn");
const intervalSelect = document.getElementById("interval");
const customIntervalContainer = document.getElementById(
  "customIntervalContainer"
);
const customIntervalInput = document.getElementById("customInterval");
const stopDateTimeInput = document.getElementById("stopDateTime");
const actionText = document.getElementById("actionText");
const actionFile = document.getElementById("actionFile");
const output = document.getElementById("output");

// Password
const correctPassword = "password123"; // Password yang benar
const emergencyPassword = "emergency456"; // Password darurat

// Modal
const passwordModal = document.getElementById("passwordModal");
const passwordInput = document.getElementById("passwordInput");
const submitPasswordBtn = document.getElementById("submitPassword");
const closeModal = document.getElementsByClassName("close")[0];

// Tampilkan input custom interval jika "Custom" dipilih
intervalSelect.addEventListener("change", () => {
  customIntervalContainer.style.display =
    intervalSelect.value === "custom" ? "block" : "none";
});

// Buka modal saat tombol Check-In diklik
checkinBtn.addEventListener("click", () => {
  passwordModal.style.display = "flex";
});

// Tutup modal saat tombol close diklik
closeModal.addEventListener("click", () => {
  passwordModal.style.display = "none";
});

// Submit password
submitPasswordBtn.addEventListener("click", () => {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === correctPassword) {
    checkIn();
    passwordModal.style.display = "none";
  } else if (enteredPassword === emergencyPassword) {
    triggerAction("Password darurat digunakan! Kemungkinan ada bahaya.");
    passwordModal.style.display = "none";
  } else {
    alert("Password salah!");
  }

  passwordInput.value = ""; // Reset input
});

function startTimer() {
  if (isRunning) return;

  // Ambil interval yang dipilih
  if (intervalSelect.value === "custom") {
    interval = parseInt(customIntervalInput.value);
  } else {
    interval = parseInt(intervalSelect.value);
  }

  // Ambil waktu berhenti jika diatur
  if (stopDateTimeInput.value) {
    const stop = new Date(stopDateTimeInput.value);
    const now = new Date();
    interval = Math.floor((stop - now) / 1000); // Hitung interval dalam detik
  }

  if (isNaN(interval) || interval <= 0) {
    alert("Masukkan durasi yang valid!");
    return;
  }

  timeLeft = interval;
  isRunning = true;
  startBtn.disabled = true;
  checkinBtn.disabled = false;
  output.textContent = ""; // Hilangkan pesan reset
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      triggerAction("Timer habis!");
    }
  }, 1000);
}

function updateTimer() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function checkIn() {
  if (!isRunning) return;

  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  checkinBtn.disabled = true;
  timerDisplay.textContent = "00:00:00";
  output.textContent = "Timer di-reset!";
}

async function triggerAction(message = "Tindakan dijalankan!") {
  isRunning = false;
  startBtn.disabled = false;
  checkinBtn.disabled = true;

  const text = actionText.value.trim();
  const file = actionFile.files[0];

  let filename = null;
  let fileContent = null;

  if (file) {
    filename = file.name;
    fileContent = await file.arrayBuffer();
  }

  // Kirim data ke backend
  try {
    const response = await fetch("http://localhost:3000/send-action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message + "\n\n" + text,
        filename,
        fileContent: fileContent
          ? { data: Array.from(new Uint8Array(fileContent)) }
          : null, // Konversi ArrayBuffer ke format yang bisa dikirim
      }),
    });

    if (response.ok) {
      output.textContent = "Email dikirim!";
    } else {
      output.textContent = "Gagal mengirim email.";
    }
  } catch (error) {
    console.error("Error:", error);
    output.textContent = "Terjadi kesalahan saat mengirim email.";
  }
}

startBtn.addEventListener("click", startTimer);

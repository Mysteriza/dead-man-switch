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
const correctPassword = "password123"; // Correct password
const emergencyPassword = "emergency456"; // Emergency password

// Modal
const passwordModal = document.getElementById("passwordModal");
const passwordInput = document.getElementById("passwordInput");
const submitPasswordBtn = document.getElementById("submitPassword");
const closeModal = document.getElementsByClassName("close")[0];

// Show custom interval input if "Custom" is selected
intervalSelect.addEventListener("change", () => {
  customIntervalContainer.style.display =
    intervalSelect.value === "custom" ? "block" : "none";
});

// Open modal when Check-In button is clicked
checkinBtn.addEventListener("click", () => {
  passwordModal.style.display = "flex";
});

// Close modal when close button is clicked
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
    // Stop the timer and reset the display
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    checkinBtn.disabled = true;
    timerDisplay.textContent = "00:00:00";
    output.textContent = "Password received! Timer stopped.";

    // Clear saved time and interval from localStorage
    localStorage.removeItem("startTime");
    localStorage.removeItem("interval");

    // Trigger emergency action
    triggerAction("Emergency Password digunakan! Sesuatu telah terjadi.");
    passwordModal.style.display = "none";
  } else {
    alert("Wrong password!");
  }

  passwordInput.value = ""; // Reset input
});

function startTimer() {
  if (isRunning) return;

  // Get the selected interval
  if (intervalSelect.value === "custom") {
    interval = parseInt(customIntervalInput.value);
  } else {
    interval = parseInt(intervalSelect.value);
  }

  // Get the stop time if set
  if (stopDateTimeInput.value) {
    const stop = new Date(stopDateTimeInput.value);
    const now = new Date();
    interval = Math.floor((stop - now) / 1000); // Calculate interval in seconds
  }

  if (isNaN(interval) || interval <= 0) {
    alert("Enter a valid duration!");
    return;
  }

  timeLeft = interval;
  isRunning = true;
  startBtn.disabled = true;
  checkinBtn.disabled = false;
  output.textContent = ""; // Clear reset message

  // Save start time and interval to localStorage
  const startTime = new Date().getTime();
  localStorage.setItem("startTime", startTime);
  localStorage.setItem("interval", interval);

  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      triggerAction("Timer runs out!");
      localStorage.removeItem("startTime"); // Clear saved time
      localStorage.removeItem("interval"); // Clear saved interval
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
  output.textContent = "The timer has been reset!";

  // Clear saved time and interval
  localStorage.removeItem("startTime");
  localStorage.removeItem("interval");
}

async function triggerAction(message = "Action executed!") {
  isRunning = false;
  startBtn.disabled = false;
  checkinBtn.disabled = true;

  const text = actionText.value.trim();
  const file = actionFile.files[0];

  // Set pesan dan teks ke form FormSubmit
  document.getElementById("formActionText").value = message + "\n\n" + text;

  // Jika ada file, tambahkan ke form
  if (file) {
    const fileInput = document.getElementById("formActionFile");
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;
  }

  // Kirim data ke FormSubmit menggunakan AJAX
  const formData = new FormData(document.getElementById("deadManForm"));

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/rifqifachriza24@gmail.com",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Email sent successfully:", result);
      output.textContent = "Email sent successfully!";
    } else {
      console.error("Failed to send email:", response.statusText);
      output.textContent = "Failed to send email.";
    }
  } catch (error) {
    console.error("Error:", error);
    output.textContent = "An error occurred while sending email.";
  }
}

// Hide/Show Password
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
});

// Confirm Password with Enter
passwordInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission (if any)
    submitPasswordBtn.click(); // Trigger submit button
  }
});

// Check for saved timer on page load
window.addEventListener("load", () => {
  const savedStartTime = localStorage.getItem("startTime");
  const savedInterval = localStorage.getItem("interval");

  if (savedStartTime && savedInterval) {
    const startTime = parseInt(savedStartTime);
    const interval = parseInt(savedInterval);
    const now = new Date().getTime();
    const elapsedTime = Math.floor((now - startTime) / 1000); // Calculate elapsed time in seconds

    if (elapsedTime < interval) {
      timeLeft = interval - elapsedTime;
      isRunning = true;
      startBtn.disabled = true;
      checkinBtn.disabled = false;

      timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
          clearInterval(timer);
          triggerAction("Timer runs out!");
          localStorage.removeItem("startTime"); // Clear saved time
          localStorage.removeItem("interval"); // Clear saved interval
        }
      }, 1000);
    } else {
      // Timer has already expired
      localStorage.removeItem("startTime");
      localStorage.removeItem("interval");
    }
  }
});

startBtn.addEventListener("click", startTimer);

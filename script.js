// ambil elemen-elemen
const loginForm = document.getElementById("loginForm");
const welcomeUser = document.getElementById("welcomeuser");

// ambil semua section
const loginSection = document.querySelector(".login-box").parentElement;
const mainMenuSection = document.querySelector(".mainMenuSection").parentElement;
const scheduleSection = document.querySelector(".Schedule-section").parentElement;
const bookingSection = document.querySelector(".bookingSection").parentElement;
const tiketSection = document.querySelector(".tiketsSection").parentElement;

// fungsi untuk sembunyikan semua section
function hideAllSections() {
  loginSection.style.display = "none";
  mainMenuSection.style.display = "none";
  scheduleSection.style.display = "none";
  bookingSection.style.display = "none";
  tiketSection.style.display = "none";
}

// saat pertama kali halaman load → tampilkan login saja
hideAllSections();
loginSection.style.display = "block";

// event submit login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // ambil email dari input
  const email = loginForm.querySelector("input[type='email']").value;
  const username = email.split("@")[0]; // ambil bagian sebelum @

  // tampilkan pesan di main menu
  welcomeUser.textContent = `Hi, ${username}!`;

  // ganti tampilan ke main menu
  hideAllSections();
  mainMenuSection.style.display = "block";
});

// tombol logout
function logout() {
  hideAllSections();
  loginSection.style.display = "block";
  loginForm.reset();
}

// navigasi antar menu
function showschedule() {
  hideAllSections();
  scheduleSection.style.display = "block";
}
function showBooking() {
  hideAllSections();
  bookingSection.style.display = "block";
}
function showTiket() {
  hideAllSections();
  tiketSection.style.display = "block";
}
function showMainMenu() {
  hideAllSections();
  mainMenuSection.style.display = "block";
}

// --- fungsi navigasi ke jadwal film ---
function showschedule() {
  hideAllSections(); // sembunyikan semua section
  scheduleSection.style.display = "block"; // tampilkan jadwal film
}

// tombol back dari jadwal film ke menu utama
function showMainMenu() {
  hideAllSections();
  mainMenuSection.style.display = "block";
}

// Booking elements
const movieSelect = document.getElementById("movieSelect");
const timeSelect = document.getElementById("timeSelect");
const seatSelect = document.getElementById("seatSelect");
const totalPrice = document.getElementById("totalPrice");
const tiketContainer = document.getElementById("myTikets");

// --- DATA FILM & JADWAL ---
const movies = {
  "Avengers End Game": ["10:00", "13:30", "16:45", "20:00"],
  "Spider-Man: No Way Home": ["11:15", "14:30", "17:45", "21:00"],
  "The Batman": ["09:30", "13:00", "16:30", "20:15"],
};

// Simpan tiket yg sudah dipesan
let myTickets = [];

// --- HELPER UNTUK NAVIGASI ---
function hideAllSections() {
  loginSection.style.display = "none";
  mainMenuSection.style.display = "none";
  scheduleSection.style.display = "none";
  bookingSection.style.display = "none";
  tiketSection.style.display = "none";
}

// --- SAAT PERTAMA BUKA ---
hideAllSections();
loginSection.style.display = "block";

// --- LOGIN ---
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginForm.querySelector("input[type='email']").value;
  const username = email.split("@")[0];

  welcomeUser.textContent = `Hi, ${username}!`;

  hideAllSections();
  mainMenuSection.style.display = "block";
});

function logout() {
  hideAllSections();
  loginSection.style.display = "block";
  loginForm.reset();
}

// --- NAVIGASI MENU ---
function showschedule() {
  hideAllSections();
  scheduleSection.style.display = "block";
}
function showBooking() {
  hideAllSections();
  bookingSection.style.display = "block";
  loadMovieOptions();
}
function showTiket() {
  hideAllSections();
  tiketSection.style.display = "block";
  renderTickets();
}
function showMainMenu() {
  hideAllSections();
  mainMenuSection.style.display = "block";
}

// --- BOOKING LOGIC ---
const TICKET_PRICE = 50000;

// isi dropdown film
function loadMovieOptions() {
  movieSelect.innerHTML = `<option value="">--- Pilih Film ---</option>`;
  for (let movie in movies) {
    const opt = document.createElement("option");
    opt.value = movie;
    opt.textContent = movie;
    movieSelect.appendChild(opt);
  }
  timeSelect.innerHTML = `<option value="">--- Pilih Jam ---</option>`;
  seatSelect.value = 1;
  totalPrice.value = "";
}

// saat pilih film → update jam
movieSelect.addEventListener("change", function () {
  const selectedMovie = movieSelect.value;
  timeSelect.innerHTML = `<option value="">--- Pilih Jam ---</option>`;
  if (selectedMovie && movies[selectedMovie]) {
    movies[selectedMovie].forEach((jam) => {
      const opt = document.createElement("option");
      opt.value = jam;
      opt.textContent = jam;
      timeSelect.appendChild(opt);
    });
  }
});

// hitung harga otomatis
seatSelect.addEventListener("input", function () {
  const seats = parseInt(seatSelect.value) || 0;
  totalPrice.value = "Rp " + (seats * TICKET_PRICE).toLocaleString();
});

// pesan tiket
function bookTiket() {
  const movie = movieSelect.value;
  const time = timeSelect.value;
  const seats = parseInt(seatSelect.value) || 0;

  if (!movie || !time || seats <= 0) {
    alert("Lengkapi semua data sebelum pesan!");
    return;
  }

  const ticket = {
    movie,
    time,
    seats,
    price: seats * TICKET_PRICE,
  };

  myTickets.push(ticket);
  alert("Tiket berhasil dipesan!");

  showTiket();
}

// tampilkan tiket yang sudah dipesan
function renderTickets() {
  tiketContainer.innerHTML = "";
  if (myTickets.length === 0) {
    tiketContainer.innerHTML = "<p>Belum ada tiket dipesan.</p>";
    return;
  }

  myTickets.forEach((t, index) => {
    const div = document.createElement("div");
    div.className = "ticket-card";
    div.innerHTML = `
      <h3>${t.movie}</h3>
      <p>Jam: ${t.time}</p>
      <p>Kursi: ${t.seats}</p>
      <p>Total: Rp ${t.price.toLocaleString()}</p>
    `;
    tiketContainer.appendChild(div);
  });
}

// --- RENDER TIKET ---
function renderTickets() {
  tiketContainer.innerHTML = "";
  if (myTickets.length === 0) {
    tiketContainer.innerHTML = "<p>Belum ada tiket dipesan.</p>";
    return;
  }

  myTickets.forEach((t) => {
    const div = document.createElement("div");
    div.className = "ticket-card";
    div.innerHTML = `
      <h3>${t.movie}</h3>
      <p>Jam: ${t.time}</p>
      <p>Kursi: ${t.seats}</p>
      <p>Total: Rp ${t.price.toLocaleString()}</p>
    `;
    tiketContainer.appendChild(div);
  });
}
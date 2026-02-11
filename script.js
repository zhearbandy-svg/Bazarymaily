let products = [];
let currentUser = null;

// Mock OTP
function sendOTP() {
  alert("کۆد نێردرا بۆ " + document.getElementById("phone").value);
  document.getElementById("login-section").style.display = "none";
  document.getElementById("otp-section").style.display = "block";
}

function verifyOTP() {
  currentUser = document.getElementById("phone").value;
  alert("سوپاس — دڵنیایت کرا!");
  document.getElementById("otp-section").style.display = "none";
  document.getElementById("home-section").style.display = "block";
  renderProducts();
}

// Add Product
function showAddProduct() {
  document.getElementById("add-product-modal").style.display = "flex";
}

function addProduct() {
  let title = document.getElementById("product-title").value;
  let price = parseInt(document.getElementById("product-price").value);
  let endTime = Date.now() + 48*60*60*1000;

  products.push({ title, currentPrice: price, endTime });
  document.getElementById("add-product-modal").style.display = "none";
  renderProducts();
}

// Render Products
function renderProducts() {
  let container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((p, i) => {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h2>${p.title}</h2>
      <p>💰 ${p.currentPrice} IQD</p>
      <p>⏳ <span id="timer-${i}"></span></p>
      <button class="btn gold-btn" onclick="bid(${i})">مزاد بکە</button>
    `;
    container.appendChild(card);

    // Timer
    let timerEl = document.getElementById(`timer-${i}`);
    setInterval(() => {
      let remaining = p.endTime - Date.now();
      if (remaining < 0) remaining = 0;
      let h = Math.floor(remaining/3600000);
      let m = Math.floor((remaining%3600000)/60000);
      let s = Math.floor((remaining%60000)/1000);
      timerEl.textContent = `${h}:${m}:${s}`;
    }, 1000);
  });
}

function bid(i) {
  products[i].currentPrice += 5000;
  renderProducts();
}
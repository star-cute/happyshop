const products = [
    { title: "هدفون بی‌سیم", price: 120, category: "لوازم جانبی", image: "images/headphone.jpg" },
    { title: "ماوس گیمینگ", price: 75, category: "لوازم جانبی", image: "images/mouse.jpg" },
    { title: "کیبورد RGB", price: 99, category: "لوازم جانبی", image: "images/keyboard.jpg" },
    { title: "لپ‌تاپ لنوو", price: 820, category: "لپ‌تاپ", image: "images/laptop.jpg" },
    { title: "لپ‌تاپ ایسوس", price: 950, category: "لپ‌تاپ", image: "images/laptop2.jpg" },
    { title: "مچ‌بند هوشمند", price: 150, category: "گجت", image: "images/handWrist.jpg" },
    { title: "اسپیکر بلوتوث", price: 190, category: "گجت", image: "images/speaker.jpg" },
    { title: "ساعت دیجیتال", price: 240, category: "گجت", image: "images/watch.jpg" },
    { title: "کامپیوتر", price: 240, category: "گجت", image: "images/all.jpg" },
];

const productList = document.getElementById("product-list");
const cartCounter = document.getElementById("cart-counter");
const cartBox = document.getElementById("cart");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let cart = [];

function renderProducts(filtered = products) {
    productList.innerHTML = "";
    filtered.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "product";
        item.style.animationDelay = `${index * 0.1}s`;
        item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${product.price} دلار</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>افزودن به سبد</button>
    `;
        productList.appendChild(item);
    });
}

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    cartCounter.innerText = `🛒 سبد خرید (${cart.length})`;
    cartBox.innerHTML = "<h3>🧺 سبد خرید:</h3>";

    if (cart.length === 0) {
        cartBox.innerHTML += "<p>سبد خرید شما خالی است.</p>";
        return;
    }

    let total = 0;
    cart.forEach((item, i) => {
        total += item.price;
        cartBox.innerHTML += `
      <div style="margin-bottom: 8px;">
        ${item.title} - ${item.price}$
        <button onclick="removeFromCart(${i})">X</button>
      </div>
    `;
    });

    cartBox.innerHTML += `<hr><strong>مجموع: ${total.toFixed(2)} $</strong><br><br>`;

    // 🔴 اضافه‌کردن دکمه پرداخت
    cartBox.innerHTML += `
    <button onclick="fakePayment()" style="
      width: 100%; 
      background: green; 
      color: white; 
      padding: 10px; 
      border: none; 
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    ">💳 پرداخت</button>
  `;
}

// ✅ پرداخت نمایشی (fake)
function fakePayment() {
    setTimeout(() => {
        alert("✅ پرداخت شما با موفقیت انجام شد.\nممنون از خرید شما ❤️");
        cart = [];
        updateCart();
    }, 1000);
}

searchInput.addEventListener("input", () => {
    const text = searchInput.value.trim().toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(text));
    renderProducts(filtered);
});

categoryFilter.addEventListener("change", () => {
    const value = categoryFilter.value;
    const filtered = value === "all" ? products : products.filter(p => p.category === value);
    renderProducts(filtered);
});

renderProducts();

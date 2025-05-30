const container = document.getElementById("products-container");
const baseUrl = "https://fakestoreapi.com/products";
const form = document.getElementById("product-form");
const formMessage = document.getElementById("form-message");
const resetBtn = document.getElementById("reset-all");

let localProducts = JSON.parse(localStorage.getItem("products")) || [];

const saveProducts = () => {
    localStorage.setItem("products", JSON.stringify(localProducts));
};

const createProductCard = (item, index, fromLocal = false) => {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.setAttribute("data-index", index);
    productCard.setAttribute("data-source", fromLocal ? "local" : "api");

    productCard.innerHTML = `
        <img src="${item.image}" alt="${item.title}"/>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <p><strong>Price:</strong> $${item.price}</p>
        <p><strong>Brand:</strong> ${item.brand || "N/A"}</p>
        <button class="delete-btn">Delete</button>
    `;

    productCard.querySelector(".delete-btn").addEventListener("click", () => {
        if (fromLocal) {
            localProducts.splice(index, 1);
            saveProducts();
        }
        productCard.remove();
    });

    container.appendChild(productCard);
};

const fetchProducts = async () => {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        data.forEach((item, index) => createProductCard(item, index, false));
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const image = document.getElementById("image").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const brand = document.getElementById("brand").value.trim();

    if (!title || !description || !image || isNaN(price)) {
        formMessage.textContent = "Please fill all fields correctly.";
        formMessage.style.color = "red";
        return;
    }

    const newProduct = { title, description, image, price, brand };
    localProducts.push(newProduct);
    saveProducts();
    createProductCard(newProduct, localProducts.length - 1, true);

    form.reset();
    formMessage.textContent = "Product added!";
    formMessage.style.color = "green";
});

resetBtn.addEventListener("click", () => {
    container.innerHTML = "";
    localProducts = [];
    saveProducts();
    fetchProducts();
});

const loadLocalProducts = () => {
    localProducts.forEach((item, index) => createProductCard(item, index, true));
};

fetchProducts();
loadLocalProducts();

// Floating emoji + theme switch (keep existing)
const createFloatingEmoji = () => {
    const emoji = document.createElement('div');
    emoji.classList.add('floating-emoji');
    emoji.textContent = Math.random() > 0.5 ? '🌸' : '💖';
    emoji.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
};
setInterval(createFloatingEmoji, 800);


const lightSound = new Audio("https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Lobo_Loco/Reggae_Mix/Lobo_Loco_-_Sunshine_Reggae.mp3");
const redSound = new Audio("https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Ketsa/Positivity/Ketsa_-_Dub_Reggae_Groove.mp3");
const darkSound = new Audio("https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Jahzzar/Travellers_Guide/Jahzzar_-_Desert_Reggae.mp3");



const themeToggle = document.getElementById('theme-switch');
const themeLabel = document.getElementById('theme-label');
let themeState = 0; // 0 = light, 1 = red, 2 = dark

themeToggle.addEventListener('mouseenter', () => {
    document.body.classList.remove('dark-mode', 'red-mode');

    if (themeState === 1) {
    document.body.classList.add('red-mode');
    themeToggle.textContent = '🔥';
    themeToggle.style.color = '#ff4d4d';
    themeLabel.textContent = '❤️ Red Mode';
      lightSound.pause(); redSound.pause(); darkSound.pause();
lightSound.currentTime = 0;
redSound.currentTime = 0;
darkSound.currentTime = 0;

    redSound.play();
} else if (themeState === 2) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
    themeToggle.style.color = '#ffdd00';
    themeLabel.textContent = '🌙 Dark Mode';
      lightSound.pause(); redSound.pause(); darkSound.pause();
lightSound.currentTime = 0;
redSound.currentTime = 0;
darkSound.currentTime = 0;

    darkSound.play();
} else {
    themeToggle.textContent = '🌞';
    themeToggle.style.color = '#f1c40f';
    themeLabel.textContent = '☀️ Light Mode';
      lightSound.pause(); redSound.pause(); darkSound.pause();
lightSound.currentTime = 0;
redSound.currentTime = 0;
darkSound.currentTime = 0;

    lightSound.play();
}


    themeState = (themeState + 1) % 3;
});



const themeLabel = document.getElementById('theme-label');

themeToggle.addEventListener('mouseenter', () => {
    document.body.classList.remove('dark-mode', 'red-mode');

    if (themeState === 1) {
        document.body.classList.add('red-mode');
        themeLabel.textContent = '❤️ Red Mode';
    } else if (themeState === 2) {
        document.body.classList.add('dark-mode');
        themeLabel.textContent = '🌙 Dark Mode';
    } else {
        themeLabel.textContent = '☀️ Light Mode';
    }

    themeState = (themeState + 1) % 3;
});


const API_URL = "https://fakestoreapi.com/products";
const wrapper = document.getElementById("productWrapper");
const likeCount = document.getElementById("likeCount");

let likedProducts = JSON.parse(localStorage.getItem("liked")) || [];

function updateLikeCount() {
  likeCount.textContent = likedProducts.length;
}

function saveLikedProducts() {
  localStorage.setItem("liked", JSON.stringify(likedProducts));
  updateLikeCount();
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-xl p-4 shadow-md relative";

  const isLiked = likedProducts.some((p) => p.id === product.id);

  card.innerHTML = `
    <img src="${product.image}" alt="${
    product.title
  }" class="w-full h-40 object-contain mb-4 cursor-pointer">
    <h3 class="text-lg font-semibold">${product.title}</h3>
    <p class="text-gray-600 text-sm">${product.description.slice(0, 70)}...</p>
    <p class="text-green-600 font-bold mt-2">$${product.price}</p>
    <button class="w-full bg-blue-500 text-white py-1 mt-2 rounded">Savat</button>
    <button class="likeBtn absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500">
      <i class="${isLiked ? "fa-solid" : "fa-regular"} fa-heart"></i>
    </button>
  `;

  const likeBtn = card.querySelector(".likeBtn");
  likeBtn.addEventListener("click", () => {
    const alreadyLiked = likedProducts.find((p) => p.id === product.id);
    if (alreadyLiked) {
      likedProducts = likedProducts.filter((p) => p.id !== product.id);
    } else {
      likedProducts.push(product);
    }

    saveLikedProducts();

    likeBtn.querySelector("i").className = likedProducts.find(
      (p) => p.id === product.id
    )
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";
  });

  card.querySelector("img").addEventListener("click", () => {
    showModal(product);
  });

  wrapper.appendChild(card);
}

function showModal(product) {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalDesc").textContent = product.description;
  document.getElementById("modalPrice").textContent = `$${product.price}`;
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    e.target.classList.add("hidden");
  }
});

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => createProductCard(product));
    updateLikeCount();
  });

let inputdanQidirish = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    renderCards(data);
    updateLikeCount();
  });

function cardsInput(praduct) {
  wrapper.innerHTML = "";
  praduct.forEach((praduct) => createProductCard(praduct));
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  cardsInput(filtered);
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  cardsInput(filtered);
});

// logon qilgan joyim
const token = localStorage.getItem("accessToken");
if (!token) {
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("accessToken");
  window.location.href = "login.html";
}

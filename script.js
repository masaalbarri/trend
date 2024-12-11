let favoriteProducts = new Set(); // لتخزين المنتجات دون تكرار

// بيانات المنتجات
const productsData = [
  {
    id: "product1",
    title: "Jacket",
    description: "Light blue jacket with fur collar",
    price: "45$",
    image: "img/photo_2024-12-03_14-46-24.jpg",
  },
  {
    id: "product2",
    title: "Jacket",
    description: "Pink jacket with fur collar and sleeves",
    price: "47$",
    image: "img/photo_2024-12-03_14-46-26.jpg",
  },
  {
    id: "product3",
    title: "Jacket",
    description: "White jacket with fur collar and sleeves",
    price: "45$",
    image: "img/photo_2024-12-03_14-46-29.jpg",
  },
  {
    id: "product4",
    title: "Jacket",
    description: "Pink jacket with fur collar and sleeves",
    price: "55$",
    image: "img/photo_2024-12-03_14-46-31.jpg",
  },
  {
    id: "product5",
    title: "Jacket",
    description: "Red jacket with fur collar and sleeves",
    price: "56$",
    image: "img/photo_2024-12-03_14-46-33.jpg",
  },
  {
    id: "product6",
    title: "Jacket",
    description: "Black jacket with fur collar and sleeves",
    price: "65$",
    image: "img/photo_2024-12-03_14-46-40.jpg",
  },
  {
    id: "product7",
    title: "Jacket",
    description: "White jacket",
    price: "65$",
    image: "img/photo_2024-12-03_14-46-43.jpg",
  },
  {
    id: "product8",
    title: "Jacket",
    description: "Pink short jacket",
    price: "35$",
    image: "img/photo_2024-12-03_14-46-45.jpg",
  },
];

// استرجاع المفضلات من LocalStorage عند تحميل الصفحة
function loadFavorites() {
  const storedFavorites = localStorage.getItem("favoriteProducts");
  if (storedFavorites) {
    const parsedFavorites = JSON.parse(storedFavorites);
    // تأكد من أن البيانات المخزنة هي مجموعة من المعرفات الصحيحة
    if (Array.isArray(parsedFavorites) && parsedFavorites.every(id => productsData.some(p => p.id === id))) {
      favoriteProducts = new Set(parsedFavorites);
    } else {
      favoriteProducts = new Set(); // إذا كانت البيانات غير صالحة، امسح المفضلات
      localStorage.removeItem("favoriteProducts"); // امسح البيانات القديمة من LocalStorage
    }
  }
  updateFavoriteCount();
  showFavorites();
}


// حفظ المفضلات في LocalStorage
function saveFavorites() {
  localStorage.setItem("favoriteProducts", JSON.stringify([...favoriteProducts]));
}

// تحديث العداد المفضل
function updateFavoriteCount() {
  const favoriteCountElement = document.getElementById("favorite-count");
  favoriteCountElement.textContent = `Favorites: ${favoriteProducts.size}`;
}

// إضافة منتج إلى المفضلة
function addToFavorite(productId) {
  if (!favoriteProducts.has(productId)) {
    favoriteProducts.add(productId); // أضف المنتج إلى المجموعة
    updateFavoriteCount();
    saveFavorites(); // حفظ المفضلات في LocalStorage
  } else {
    alert("This product is already in your favorites!");
  }
}

// عرض قائمة المفضلات
function showFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  favoritesList.innerHTML = ""; // مسح القائمة القديمة

  if (favoriteProducts.size === 0) {
    favoritesList.innerHTML = "<div class='no-favorites'><p>No favorite products yet.</p></div>";
    return;
  }

  favoriteProducts.forEach(productId => {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price}</div>
      <button onclick="removeFromFavorite('${productId}')">Remove</button>
    `;
    favoritesList.appendChild(productElement);
  });
}

// إزالة منتج من المفضلة
function removeFromFavorite(productId) {
  favoriteProducts.delete(productId);
  updateFavoriteCount();
  showFavorites();
  saveFavorites(); // حفظ المفضلات بعد الإزالة
}

// التنقل بين الصفحات
function navigateTo(page) {
  document.querySelector(".home").style.display = page === "home" ? "block" : "none";
  document.querySelector(".favorites-page").style.display = page === "favorites" ? "block" : "none";

  if (page === "favorites") showFavorites();
}

// استدعاء دالة تحميل المفضلات عند تحميل الصفحة
window.onload = loadFavorites;

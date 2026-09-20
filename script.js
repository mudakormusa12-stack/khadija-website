var cart = JSON.parse(localStorage.getItem("khadijaCart") || "[]");

function saveCart() {
  localStorage.setItem("khadijaCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.querySelectorAll("#cartCount").forEach(function(el) {
    el.textContent = cart.reduce(function(total, item) {
      return total + item.qty;
    }, 0);
  });
}

function addToCart(id) {
  var item = cart.find(function(x) {
    return x.id === id;
  });

  if (item) {
    item.qty++;
  } else {
    var product = window.products && window.products.find(function(x) {
      return x.id === id;
    });

    if (product) {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        qty: 1
      });
    }
  }

  saveCart();

  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
});


document.addEventListener("DOMContentLoaded", function() {
  var nav = document.querySelector("nav");

  if (nav && !document.getElementById("adminLink")) {
    var link = document.createElement("a");
    link.id = "adminLink";
    link.href = "admin.html";
    link.textContent = "ADMIN";
    link.style.marginLeft = "15px";
    nav.appendChild(link);
  }
});

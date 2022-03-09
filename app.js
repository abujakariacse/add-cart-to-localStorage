// Load Previous Cart Data From Local Storage
const loadDataFromLocalStorage = () => {
  const cart = checkCartInLocalStorage();
  if (localStorage.cart) {
    document.getElementById("product-table").style.display = "table";
  } else {
    document.getElementById("product-table").style.display = "none";
  }
  for (const productName in cart) {
    let productPrice = cart[productName];
    showProductInfoInUI(productName, productPrice);
  }
};

// Get Input value from Input Field
const getInputValue = () => {
  const productNameField = document.getElementById("product-name");
  const productName = productNameField.value;
  if (!productName) {
    return;
  }
  const productPriceField = document.getElementById("product-price");
  const productPrice = parseInt(productPriceField.value);
  if (!productPrice) {
    return;
  }

  /* Calling showProductInfoInUI() & addProductToCart() Function
  to Pass ProductName & Product Price */
  showProductInfoInUI(productName, productPrice);
  addProductToCart(productName, productPrice);
  //   Clear Input field value
  productNameField.value = "";
  productPriceField.value = "";
  location.reload();
  document.getElementById("product-table").style.display = "table";
};

// Display Product in UI
const showProductInfoInUI = (productName, productPrice) => {
  const table = document.getElementById("product-table");
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.innerText = productName;
  const td2 = document.createElement("td");
  td2.innerText = productPrice;
  tr.appendChild(td1);
  tr.appendChild(td2);
  table.appendChild(tr);
};

// Check is Cart available in Local Storage?
const checkCartInLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  let cartObj;
  if (cart) {
    cartObj = JSON.parse(cart);
  } else {
    cartObj = {};
  }
  return cartObj;
};

const addProductToCart = (productName, productPrice) => {
  const cart = checkCartInLocalStorage();
  if (cart[productName]) {
    cart[productName] = cart[productName] + productPrice;
  } else {
    cart[productName] = productPrice;
  }
  const cartStringified = JSON.stringify(cart);
  localStorage.setItem("cart", cartStringified);
};

const placeOrder = () => {
  const cart = localStorage.removeItem("cart");
  const table = document.getElementById("product-table");
  table.textContent = "";
};
loadDataFromLocalStorage();

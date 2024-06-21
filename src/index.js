// ITERATION 1

function updateSubtotal(product) {
  let priceElem = product.querySelector(".price span");
  let qtyElem = product.querySelector(".quantity input");
  // price y quantity me devuelve una lista de nodos y necesito iterar sobre
  // estos nodos para obtener los valores de cada elemento.

let price = Number(priceElem.innerHTML); // convierte str en num
let quantity = Number(qtyElem.value); // convierte str en num

let subtotalPrice = price * quantity // calcular subtotal

let subtotalElem = product.querySelector(".subtotal span");
subtotalElem.innerHTML = subtotalPrice;

return subtotalPrice;
}

function calculateAll() {
  let productsElem = document.querySelectorAll(".product"); //para cada producto

  let totalPrice = 0; // variable para la suma de los productos.
  //iterar sobre los productos
  productsElem.forEach(function(Oneproduct) { 
    let productTotal = updateSubtotal(Oneproduct); // llamada a la funcion para añadir subtotal del valor
    totalPrice += productTotal;
  });
  //obtener el elemento DOM que contiene el valor total del carrito
  let finalPrice = document.querySelector("#total-value span"); 
  finalPrice.textContent = totalPrice; //Enseña el valor total 
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log("The target in remove is:", target);

  let productRemove = target.closest('.product');
  productRemove.remove();
  
  calculateAll();

}
// ITERATION 5

function createProduct() {
  //Obtener los valores de los campos de entrada
  let productNameInput = document.querySelector('.create-product input[type="text"]');
  let productPriceInput = document.querySelector('.create-product input[type="number"]');

  let productName = (productNameInput.value);
  let productPrice = Number(productPriceInput.value);

  //verificar si los campos está vacios:
  if (!productName || productPrice <= 0) {
    alert('Por favor, poner un producto valido');
    return;
  }

  //crear una nueva fila de producto:
  let productRow = document.createElement('tr');
  productRow.classList.add('product');
  productRow.innerHTML =  `<td class="name">
    <span>${productName}</span>
    </td>
    <td class="price">$<span>${productPrice}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;

  //Añadir la nueva fila a la tabla
  let cartBody = document.querySelector('#cart tbody');
  cartBody.appendChild(productRow);

  //añadir el evento de eliminacion al nuevo botón remove
  let removeBtn = productRow.querySelector('.btn-remove');
  removeBtn.addEventListener('click', removeProduct);

  productNameInput.value = '';
  productPriceInput.value = 0;
}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  const removeBtn = document.querySelectorAll(".btn-remove");
  removeBtn.forEach(btn => {
    btn.addEventListener("click", removeProduct);
  });

  let btnCreateProduct = document.getElementById('create');
  btnCreateProduct.addEventListener('click', createProduct);
});

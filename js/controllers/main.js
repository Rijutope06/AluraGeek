import { servicesProducts } from "../services/product-services.js";

const productContainer =  document.querySelector('[data-product]');

const form = document.querySelector('[data-form]');

// console.log(form);

function createCard (name, price, image, id) {
  const card = document.createElement("div");
  card.classList.add("container-card");

  card.innerHTML = `
  <div class="card-img">
    <img src=${image}" alt="${name}">
  </div>
  <div class="info-card">
    <h5 class="title-card ibm-plex-mono-regular">${name}</h5>
    <div class="description-card">
      <p class="price-card ibm-plex-mono-bold">${price}</p>
      <img data-delete class="icon-delete" src="./img/icon-delete.png" alt="">
    </div>
  </div>`;

  const deleteProdut = card.querySelector('[data-delete]');

deleteProdut.addEventListener('click', async () => {
  try {
    await servicesProducts.deleteProduct(id);
    card.remove();
  } catch (err) {
    console.log(err);
  }
})

  productContainer.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProduct = await servicesProducts.productList();

    listProduct.forEach(product => {
      productContainer.appendChild(
        createCard(
          product.name,
          product.price,
          product.image,
          product.id
        )
      )
    });

    } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit',  (event) => {
  event.preventDefault(event);

  const name = document.querySelector('[data-name]').value;
  const price = document.querySelector('[data-price]').value;
  const image = document.querySelector('[data-image]').value;

  servicesProducts.createProducts(name, price, image)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
});



render();
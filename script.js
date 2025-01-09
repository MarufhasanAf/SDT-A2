fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
  .then((res) => res.json())
  .then((data) => {
    displayData(data.drinks);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const searchByName = () => {
  const search = document.getElementById("search").value;
  const container = document.getElementById("cart-main-container");
  container.innerHTML = "";
  const details = document.getElementById("details-container");
  details.innerHTML = "";
  details.style.display = "none";
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.drinks) {
        displayData(data.drinks);
      } else {
        container.innerHTML = `<h3>Not found.</h3>`;
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
const displayData = (data) => {
  data.forEach((element) => {
    const container = document.getElementById("cart-main-container");
    const div = document.createElement("div");
    div.classList.add("card-container");
    const imgLink = element.strDrinkThumb;
    div.innerHTML = `
      <img class="card-img" src="${imgLink}">
      <h5 class="product-title"><span>Name: </span>${element.strGlass}</h5>
      <p>Category: ${element.strCategory}</p>
      <p class="instructions">Instructions: ${element.strInstructions.slice(
        0,
        20
      )}</p>
      <button onclick="modalView(${
        element.idDrink
      })" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-cart details-btn">Details</button> <button onclick="cartAdd(${
      element.idDrink
    })" class="btn-cart cart-add-btn">Add to Cart</button>
      `;
    container.appendChild(div);
  });
};
let productCnt = document.getElementById("product-cnt");
let cnt = productCnt.innerText;
parseInt(cnt);
const cartAdd = (element) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${element}`)
    .then((res) => res.json())
    .then((data) => {
      cnt++;
      if (cnt >= 8) {
        alert("You have reach the max limit");
        return;
      }
      const groupContainer = document.getElementById("group-container");
      const div = document.createElement("div");
      div.classList.add("cart-list");
      div.innerHTML = `
          <p>${cnt}</p>
          <img class="cart-round-img" src="${data.drinks[0].strDrinkThumb}">
          <h5 class="cart-name">${data.drinks[0].strGlass}</h5>
        `;
      productCnt.innerText = cnt;
      groupContainer.appendChild(div);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

const modalView = (element) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${element}`)
    .then((res) => res.json())
    .then((data) => {
      let title = document.getElementById("exampleModalLabel");
      title.innerText = `${data.drinks[0].strGlass}`;
      const modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = "";
      const div = document.createElement("div");
      div.innerHTML = `
        <img class="modal-img" src="${data.drinks[0].strDrinkThumb}">
        <h5>Details</h5>
        <p>Catagory: <b>${data.drinks[0].strCategory}</b></p>
        <p>Catagory: <b>${data.drinks[0].strAlcoholic}</b></p>
        <p>${data.drinks[0].strInstructions} </p>

      `;
      modalBody.appendChild(div);
      console.log(data.drinks[0]);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

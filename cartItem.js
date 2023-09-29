const cartColumn = document.querySelector(".cart-list-column");

/*
let cartItem, cartItemImgSrc,
    cartItemImgAlt,
    cartItemTitle,
    cartItemPrice,
    cartItemQuantity,
    cartItemNumber,
    cartItemLink;
*/
let dataFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

dataFromLocalStorage.forEach(function (item) {
    if (item.itemCartValue == "added") {
        cartItem = document.createElement("div");
        cartItem.classList.add("cart-list-item");
        cartColumn.appendChild(cartItem);

        cartItem.innerHTML = `
            <div class="cart-item-info">
            <img src="#" alt="" class="cart-list-item-img">
            <div class="cart-item-details">
                <p class="cart-item-name"></p>
                <p class="cart-item-price">Price: <span
                        class="cart-item-price--number"></span></p>
                <p class="cart-item-amount">Amount: <span class="cart-item-amount--number"></span>
                </p>
            </div> <!-- /cart-item-details -->
            </div> <!-- /cart-item-->
            <div class="cart-btn-wrapper">
            <a href="#" class="cart-btn edit-cart-btn" target="_blank">Edit</a>
            <button class="cart-btn delete-cart-btn">Delete</button>
            </div>
            </div> <!-- /cart-list-item-->`

        cartItemImgSrc = cartItem.querySelector(".cart-list-item-img");
        cartItemImgAlt = cartItem.querySelector(".cart-list-item-img").getAttribute("alt");
        cartItemTitle = cartItem.querySelector(".cart-item-name");
        cartItemPrice = cartItem.querySelector(".cart-item-price--number");
        cartItemQuantity = cartItem.querySelector(".cart-item-amount--number");
        cartItemLink = cartItem.querySelector(".edit-cart-btn");
        cartItemNumber = item.itemNumber;

        cartItemImgSrc.setAttribute("src", item.itemImg);
        cartItemTitle.innerText = item.itemTitle;
        cartItemPrice.innerText = item.itemPrice;
        cartItemQuantity.innerText = item.itemQuantityCount;
        cartItemLink.setAttribute("href", item.itemLink);
        cartItem.setAttribute("data-number", cartItemNumber);
    }
})


/* changing numbers in the header */
/* upload number in cart from localStorage */
/*
const cartNumber = document.querySelector(".cart-number");
const cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
cartNumber.innerText = cartNumberAmount;

const quoteNumber = document.querySelector(".quote-number");
const quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber")));
quoteNumber.innerText = quoteNumberAmount;
*/
/* listening click on delete btn */

const cartPage = document.querySelector(".cart-page");
cartPage.addEventListener("click", deletingItemFromCart);

function deletingItemFromCart(e) {
    //e.preventDefault();

    const cartDeleteBtn = e.target.closest(".delete-cart-btn");
    const cartDeleteItem = e.target.closest(".cart-list-item");
    const cartDeleteItemAmount = cartDeleteItem.querySelector(".cart-item-amount--number").innerText;

    let cartDeleteItemNumber = parseInt(cartDeleteItem.dataset.number);

    if (cartDeleteBtn == e.target) {

        cartDeleteItem.style.display = "none";
        cartNumber.innerText = cartNumber.innerText - cartDeleteItemAmount;
        cartNumberAmount = cartNumber.innerText;

        for (i = 0; i < dataFromLocalStorage.length; i++) {
            if (cartDeleteItemNumber == dataFromLocalStorage[i].itemNumber) {
                dataFromLocalStorage.splice([i], 1);
            }
        }

        let dataToLocalStorageJSON = JSON.stringify(dataFromLocalStorage);
        localStorage.setItem("addedItemtoStorage", dataToLocalStorageJSON);
        dataFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

        let cartNumberAmountJSON = JSON.stringify(cartNumberAmount);
        localStorage.setItem("addedItemCartNumber", cartNumberAmountJSON);
        cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
    }

    if (cartNumberAmount == 0) {
        cartNumber.innerText = "";
        localStorage.removeItem("addedItemCartNumber");
        localStorage.removeItem("addedItemtoStorage");
    }

}


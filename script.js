const myDishes = [
    {
        categoryIcon: "./assets/img/burgerhead.png",
        category: "Burger",
        picture: "./assets/img/veggieblack.png",
        name: "Veggie Mushroom Black Burger",
        price: 16.9,
        description: "Mixed green Salad, Tomatoes, Edamame, Mushrooms",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/burgerhead.png",
        category: "Burger",
        picture: "./assets/img/allmeat.png",
        name: "All Meat Burger",
        price: 15.9,
        description:
            "Beef, Bacon, Dill Pickles, Smoked Cheese, Ketchup, BBQ sauce",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/burgerhead.png",
        category: "Burger",
        picture: "./assets/img/beefred.png",
        name: "Beef Red Burger",
        price: 14.9,
        description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/burgerhead.png",
        category: "Burger",
        picture: "./assets/img/bigchicken.png",
        name: "Big Chicken Burger",
        price: 15.9,
        description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell Pepper",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/pizzahead.png",
        category: "Pizza (30cm)",
        picture: "./assets/img/margherita.png",
        name: "Pizza Margherita",
        price: 11.9,
        description: "Tomatoe, Sauce, Mozzarella",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/pizzahead.png",
        category: "Pizza (30cm)",
        picture: "./assets/img/chorizo.png",
        name: "Pizza Chorizo",
        price: 13.9,
        description: "Tomatoe slice, Mozarella, Chorizo",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/pizzahead.png",
        category: "Pizza (30cm)",
        picture: "./assets/img/funghi.png",
        name: "Pizza Funghi",
        price: 12.9,
        description: "Red Onion, Olives, Button Mushrooms, Mozzarella",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/pizzahead.png",
        category: "Pizza (30cm)",
        picture: "./assets/img/quattro.png",
        name: "Pizza Quattro Formaggi with Chicken",
        price: 15.9,
        description:
            "Chicken, Mozarella, Gorgonzola, Fontina, Parmigiano Reggiano",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/saladhead.png",
        category: "Salad",
        picture: "./assets/img/warm.png",
        name: "Warm Beef Arugula Salad",
        price: 16.9,
        description:
            "Beef, Arugula, Field Salad, Greek feta, Cherry Tomatoes, Sun-dried Tomatoes, Balsamico-Vinegar Dressing",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/saladhead.png",
        category: "Salad",
        picture: "./assets/img/mini.png",
        name: "Mini green Salad",
        price: 7.9,
        description: "Green Salad, Cucumber, Parsley, Radishes",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/saladhead.png",
        category: "Salad",
        picture: "./assets/img/green.png",
        name: "Green Salad with Seafood",
        price: 16.9,
        description:
            "Mixed greens, Cherry Tomatoes, Red Onion, Mussels, Squid Rings, Dijon Mustard-lemon Dressing with Dill",
        amount: 0,
    },

    {
        categoryIcon: "./assets/img/saladhead.png",
        category: "Salad",
        picture: "./assets/img/vegan.png",
        name: "Vegan green Salad with Tofu",
        price: 14.9,
        description:
            "Green Salad, Cherry Tomatoes, Cucumber, Baby Spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
        amount: 0,
    },
];

import {
    getDishTemplate,
    getCategoryTemplate,
    getBasketItemTemplate,
    getBasketFinalTemplate,
} from "./scripts/template.js";

function renderDishes() {
    const showRef = document.getElementById("imageDishes");
    if (!showRef) return;

    showRef.innerHTML = "";
    let currentCategory = "";

    for (let i = 0; i < myDishes.length; i++) {
        let dish = myDishes[i];

        if (dish.category !== currentCategory) {
            showRef.innerHTML += getCategoryTemplate(
                dish.category,
                dish.categoryIcon,
            );
            currentCategory = dish.category;
        }

        showRef.innerHTML += getDishTemplate(dish, i);
    }
}

window.renderBasket = function () {
    const desktopBasket = document.getElementById("basket_responsive");
    const mobileBasket = document.getElementById("mobile_basket_content");

    let subtotal = 0;
    let itemsInBasket = myDishes.filter((dish) => dish.amount > 0);
    let basketHtml = `<h2>Your Basket</h2>`;

    if (itemsInBasket.length === 0) {
        basketHtml += `<p class="empty-basket">Nothing here yet. <br> Go ahead and choose something delicious!</p>`;
    } else {
        basketHtml += `<div class="basket-items-list">`;
        for (let i = 0; i < myDishes.length; i++) {
            if (myDishes[i].amount > 0) {
                subtotal += myDishes[i].price * myDishes[i].amount;
                basketHtml += getBasketItemTemplate(myDishes[i], i);
            }
        }
        basketHtml += `</div>`;
        basketHtml += getBasketFinalTemplate(subtotal);
    }

    if (desktopBasket) desktopBasket.innerHTML = basketHtml;
    if (mobileBasket) mobileBasket.innerHTML = basketHtml;

    updateBasketBadge();
};

function updateBasketBadge() {
    const badge = document.getElementById("basket_badge");
    if (!badge) return;

    const totalAmount = myDishes.reduce((sum, dish) => sum + dish.amount, 0);

    if (totalAmount > 0) {
        badge.innerText = totalAmount;
        badge.style.display = "flex";
    } else {
        badge.style.display = "none";
    }
}

window.placeOrder = function () {
    const dialog = document.getElementById("success_overlay");

    closeBasketOverlay();

    dialog.showModal();

    myDishes.forEach((dish) => (dish.amount = 0));
    renderDishes();
    renderBasket();
};

window.closeOrderDialog = function () {
    const dialog = document.getElementById("success_overlay");
    dialog.close();
};

window.openBasketOverlay = function () {
    const dialog = document.getElementById("basket_overlay");
    if (dialog) dialog.showModal();
};

window.closeBasketOverlay = function () {
    const dialog = document.getElementById("basket_overlay");
    if (dialog) dialog.close();
};

window.addToBasket = function (i) {
    myDishes[i].amount++;
    renderDishes();
    renderBasket();
};

window.removeFromBasket = function (i) {
    if (myDishes[i].amount > 0) {
        myDishes[i].amount--;
    }
    renderDishes();
    renderBasket();
};

renderDishes();
renderBasket();

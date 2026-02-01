export function getCategoryTemplate(categoryName, categoryIcon) {
    return `
        <div class="category-header">
            <div class="category-content">
                <img src="${categoryIcon}" alt="Icon"> 
                <h2>${categoryName}</h2>
            </div>
        </div>
    `;
}

export function getDishTemplate(dish, i) {
    const priceFormatted = dish.price.toFixed(2).replace(".", ",");

    return `
        <article class="dish-card">
            <div class="dish-content">
                <img src="${dish.picture}" class="dishImage" alt="${dish.name}">
                <div class="dish-header">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
                <div class="dish-footer">
                    <span class="price">${priceFormatted} €</span>
                    ${dish.amount > 0 ? `<span class="added-badge">Added: ${dish.amount}</span>` : ""}
                    <button onclick="addToBasket(${i})">Add to basket</button>
                </div>
            </div>
        </article>
    `;
}

export function getBasketItemTemplate(dish, i) {
    const totalItemPrice = (dish.price * dish.amount)
        .toFixed(2)
        .replace(".", ",");
    return `
        <div class="basket-item">
            <div class="basket-item-info">
                <span>${dish.amount} x ${dish.name}</span>
            </div>
            <div class="basket-controls">
                <button onclick="removeFromBasket(${i})">🗑️</button> 
                <span>${dish.amount}</span>
                <button onclick="addToBasket(${i})">+</button>
                <span class="basket-item-price">${totalItemPrice}€</span>
            </div>
        </div>
    `;
}

export function getBasketFinalTemplate(subtotal) {
    const delivery = 4.99;
    const total = subtotal + delivery;
    const totalFormatted = total.toFixed(2).replace(".", ",");

    return `
        <div class="basket-summary">
            <div class="summary-line"><span>Subtotal:</span> <span>${subtotal.toFixed(2).replace(".", ",")} €</span></div>
            <div class="summary-line"><span>Delivery fee:</span> <span>${delivery.toFixed(2).replace(".", ",")} €</span></div>
            <div class="summary-total"><span>Total:</span> <span>${totalFormatted} €</span></div>
            <button class="buy-btn" onclick="placeOrder()">Buy now (${totalFormatted} €)</button>
        </div>
    `;
}

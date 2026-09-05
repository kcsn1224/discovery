

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutDelivery = document.getElementById("checkoutDelivery");
const checkoutTotal = document.getElementById("checkoutTotal");


// Get cart from Local Storage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}


// Display checkout items
function displayCheckout() {

    const cart = getCart();

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="alert alert-info">
                Your cart is empty.
                <br><br>
                <a href="menu.html" class="btn btn-warning">
                    Go to Menu
                </a>
            </div>
        `;

        checkoutSubtotal.innerText = "₹0";
        checkoutDelivery.innerText = "₹0";
        checkoutTotal.innerText = "₹0";

        return;
    }


    cart.forEach(item => {

        checkoutItems.innerHTML += `
            <div class="d-flex justify-content-between mb-3">

                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>
                        ₹${item.price} × ${item.quantity}
                    </small>
                </div>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

            </div>
        `;

    });


    calculateCheckoutTotal();
}


// Calculate total
function calculateCheckoutTotal() {

    const cart = getCart();

    const subtotal = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

    const delivery = subtotal > 0 ? 30 : 0;

    const total = subtotal + delivery;


    checkoutSubtotal.innerText = `₹${subtotal}`;

    checkoutDelivery.innerText = `₹${delivery}`;

    checkoutTotal.innerText = `₹${total}`;
}


// Place order
document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;

        const payment = document.getElementById("payment").value;


        alert(
            `Thank you ${name}! 🎉\n\n` +
            `Your Jono Eats order has been placed.\n` +
            `Payment Method: ${payment}`
        );


        // Clear cart after order
        localStorage.removeItem("cart");


        // Go back to home page
        window.location.href = "index.html";

    });


// Start
displayCheckout();

// ================= FOOD DATA =================

const foods = [

    {
        id: 1,
        name: "Classic Burger",
        price: 149,
        category: "Burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },


    {
        id: 2,
        name: "Cheese Pizza",
        price: 299,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },


    {
        id: 3,
        name: "Chicken Biryani",
        price: 249,
        category: "Biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80"
    },


    {
        id: 4,
        name: "Veg Momos",
        price: 120,
        category: "Momos",
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80"
    },


    {
        id: 5,
        name: "French Fries",
        price: 99,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80"
    },


    {
        id: 6,
        name: "Cold Coffee",
        price: 129,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
    }

];



// ================= SELECT HTML ELEMENT =================

const foodContainer =
    document.getElementById("foodContainer");



// ================= DISPLAY FOOD =================

function displayFoods(foodList) {

    foodContainer.innerHTML = "";


    foodList.forEach(function(food) {

        foodContainer.innerHTML += `

            <div class="col-md-4">

                <div class="food-card">

                    <img
                        src="${food.image}"
                        alt="${food.name}">


                    <div class="food-content">

                        <h4>
                            ${food.name}
                        </h4>


                        <p class="text-muted">
                            ${food.category}
                        </p>


                        <h5>
                            ₹${food.price}
                        </h5>


                        <button
                            class="btn btn-warning w-100"
                            onclick="addToCart(${food.id})">

                            Add to Cart 🛒

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}



// ================= ADD TO CART =================

function addToCart(id) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const food =
        foods.find(function(item) {

            return item.id === id;

        });


    const existingItem =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...food,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        food.name + " added to cart!"
    );

}



// ================= CART COUNT =================

function updateCartCount() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let count = cart.reduce(
        function(total, item) {

            return total + item.quantity;

        },
        0
    );


    const cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText = count;

    }

}



// ================= SEARCH =================

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    function() {

        const searchValue =
            this.value.toLowerCase();


        const filteredFoods =
            foods.filter(function(food) {

                return food.name
                    .toLowerCase()
                    .includes(searchValue);

            });


        displayFoods(filteredFoods);

    }
);



// ================= START WEBSITE =================

displayFoods(foods);

updateCartCount();
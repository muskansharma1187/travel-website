
    


  


  // ===============================
// TRAVORA - CORRECTED SCRIPT.JS
// ===============================


// ---------- SEARCH ----------
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const destinationCards = document.querySelectorAll(".destination-card");
const quickButtons = document.querySelectorAll(".quick-btn");

function showAllDestinations() {
    destinationCards.forEach(card => {
        card.style.display = "block";
    });
}

function searchDestination(value) {
    const searchValue = value.toLowerCase().trim();

    destinationCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        if (
            name.includes(searchValue) ||
            category.includes(searchValue)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("destinations").scrollIntoView({
        behavior: "smooth"
    });
}

searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim() === "") {
        showAllDestinations();
        return;
    }

    searchDestination(searchInput.value);
});

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});


// ---------- QUICK SEARCH ----------
quickButtons.forEach(button => {
    button.addEventListener("click", () => {

        const destination = button.textContent.trim();

        searchInput.value = destination;

        searchDestination(destination);
    });
});


// ---------- FILTERS ----------
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.category.toLowerCase();

        destinationCards.forEach(card => {

            const cardCategory =
                card.dataset.category.toLowerCase();

            if (
                category === "all" ||
                category === cardCategory
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// ---------- DESTINATION DETAILS ----------
const modal = document.getElementById("destinationModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const destinationInfo = {

    "Bali": {
        country: "Indonesia",
        category: "Beach",
        bestTime: "April - October",
        budget: "₹30,000 - ₹60,000",
        description:
            "Bali is famous for beautiful beaches, temples, sunsets, resorts and exciting activities."
    },

    "Paris": {
        country: "France",
        category: "Culture",
        bestTime: "April - June",
        budget: "₹70,000 - ₹1,20,000",
        description:
            "Paris is famous for art, museums, architecture, fashion and amazing food."
    },

    "Swiss Alps": {
        country: "Switzerland",
        category: "Adventure",
        bestTime: "December - March",
        budget: "₹1,00,000 - ₹1,80,000",
        description:
            "The Swiss Alps are perfect for mountains, snow, hiking and breathtaking views."
    },

    "Tokyo": {
        country: "Japan",
        category: "Culture",
        bestTime: "March - May",
        budget: "₹80,000 - ₹1,40,000",
        description:
            "Tokyo offers a mix of modern technology, traditional culture, delicious food and exciting city life."
    }
};


document.querySelectorAll(".details-btn").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".destination-card");

        const name = card.querySelector("h3").textContent.trim();

        const info = destinationInfo[name];

        if (!info) return;

        modalBody.innerHTML = `
            <h2>${name}</h2>

            <p><strong>Country:</strong> ${info.country}</p>

            <p><strong>Category:</strong> ${info.category}</p>

            <p>${info.description}</p>

            <p><strong>Best Time:</strong> ${info.bestTime}</p>

            <p><strong>Estimated Budget:</strong> ${info.budget}</p>

            <button class="btn primary modal-plan-btn">
                Plan This Trip
            </button>
        `;

        modal.classList.add("show");
    });
});


// ---------- CLOSE MODAL ----------
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

window.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }
});


// ---------- FAVORITES ----------
const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

const favoritesContainer =
    document.getElementById("favoritesContainer");

const favoriteCount =
    document.getElementById("favoriteCount");

let favorites =
    JSON.parse(localStorage.getItem("travoraFavorites")) || [];


function updateFavorites() {

    favoriteCount.textContent = favorites.length;

    if (favorites.length === 0) {

        favoritesContainer.innerHTML =
            "<p>No favorite destinations yet ❤️</p>";

        return;
    }

    favoritesContainer.innerHTML = "";

    favorites.forEach(name => {

        const item = document.createElement("div");

        item.className = "favorite-item";

        item.innerHTML = `
            <h3>${name}</h3>
            <button class="remove-favorite">
                Remove
            </button>
        `;

        item.querySelector(".remove-favorite")
            .addEventListener("click", () => {

                favorites =
                    favorites.filter(item => item !== name);

                localStorage.setItem(
                    "travoraFavorites",
                    JSON.stringify(favorites)
                );

                updateFavorites();
                updateHeartButtons();
            });

        favoritesContainer.appendChild(item);
    });
}


function updateHeartButtons() {

    favoriteButtons.forEach(button => {

        const card =
            button.closest(".destination-card");

        const name =
            card.querySelector("h3").textContent.trim();

        if (favorites.includes(name)) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }
    });
}


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".destination-card");

        const name =
            card.querySelector("h3").textContent.trim();

        if (favorites.includes(name)) {

            favorites =
                favorites.filter(item => item !== name);

        } else {

            favorites.push(name);
        }

        localStorage.setItem(
            "travoraFavorites",
            JSON.stringify(favorites)
        );

        updateFavorites();
        updateHeartButtons();
    });
});

updateFavorites();
updateHeartButtons();


// ---------- TRIP PLANNER ----------
const tripForm = document.getElementById("tripForm");
const tripResult = document.getElementById("tripResult");

tripForm.addEventListener("submit", event => {

    event.preventDefault();

    const destination =
        document.getElementById("tripDestination").value;

    const days =
        document.getElementById("days").value;

    const style =
        document.getElementById("travelStyle").value;

    const budget =
        document.getElementById("budget").value;

    tripResult.innerHTML = `
        <div class="generated-trip">

            <h2>✈️ Your Trip Plan</h2>

            <p>
                <strong>Destination:</strong>
                ${destination}
            </p>

            <p>
                <strong>Duration:</strong>
                ${days} days
            </p>

            <p>
                <strong>Travel Style:</strong>
                ${style}
            </p>

            <p>
                <strong>Budget:</strong>
                ${budget}
            </p>

            <hr>

            <h3>Suggested Plan</h3>

            <p>📍 Explore popular attractions</p>
            <p>🍴 Try local food</p>
            <p>📸 Visit famous places</p>
            <p>🌅 Enjoy and explore the destination</p>

        </div>
    `;

    tripResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});


// ---------- BUDGET CALCULATOR ----------
const travelers =
    document.getElementById("travelers");

const calcDays =
    document.getElementById("calcDays");

const dailyBudget =
    document.getElementById("dailyBudget");

const totalAmount =
    document.getElementById("totalAmount");


function calculateBudget() {

    const people = Number(travelers.value) || 0;
    const days = Number(calcDays.value) || 0;
    const budget = Number(dailyBudget.value) || 0;

    const total = people * days * budget;

    totalAmount.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


travelers.addEventListener("input", calculateBudget);
calcDays.addEventListener("input", calculateBudget);
dailyBudget.addEventListener("input", calculateBudget);

calculateBudget();


// ---------- DARK MODE ----------
const themeBtn =
    document.getElementById("themeBtn");

const savedTheme =
    localStorage.getItem("travoraTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";
}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkMode =
        document.body.classList.contains("dark-mode");

    if (darkMode) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "travoraTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "travoraTheme",
            "light"
        );
    }
});


// ---------- MOBILE MENU ----------
const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show-menu");
});


document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("show-menu");
        });
    });


// ---------- PLAN FROM MODAL ----------
modal.addEventListener("click", event => {

    if (
        event.target.classList.contains("modal-plan-btn")
    ) {

        const destination =
            modalBody.querySelector("h2").textContent.trim();

        const tripDestination =
            document.getElementById("tripDestination");

        for (let option of tripDestination.options) {

            if (
                option.textContent.trim() === destination
            ) {
                tripDestination.value = option.value;
                break;
            }
        }

        modal.classList.remove("show");

        document.getElementById("planner")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
});
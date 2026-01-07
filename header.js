const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");
const userToggle = document.getElementById("userToggle");
const userBack = document.getElementById("userBack");
const mainNav = document.getElementById("mainNav");
const userNav = document.getElementById("userNav");

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("active");
});

// User menu toggle
userToggle.addEventListener("click", (e) => {
    e.preventDefault();
    mainNav.classList.add("slide-out");
    userNav.classList.add("slide-in");
});

// Back to main nav
userBack.addEventListener("click", (e) => {
    e.preventDefault();
    mainNav.classList.remove("slide-out");
    userNav.classList.remove("slide-in");
});

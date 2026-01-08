const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");
const userToggle = document.getElementById("userToggle");
const userBack = document.getElementById("userBack");
const mainNav = document.getElementById("mainNav");
const userNav = document.getElementById("userNav");


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("active");
});


userToggle.addEventListener("click", (e) => {
    mainNav.classList.add("slide-out");
    userNav.classList.add("slide-in");
});


userBack.addEventListener("click", (e) => {
    mainNav.classList.remove("slide-out");
    userNav.classList.remove("slide-in");
});

//loader
/* onload = () => {
  const load = document.getElementById("load");

  setTimeout(() => {
    load.style.display = "none";
  }, 1500);
}; */

//menu toggle
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

//scroll
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

//mixer for products
let mixerProducts = mixitup(".products__content", {
  selectors: {
    target: ".products__card",
  },
  animation: {
    duration: 300,
  },
});
mixerProducts.filter(".delicacies");

//active link highlight
const linkProducts = document.querySelectorAll(".products__item");
function activeProducts() {
  linkProducts.forEach((l) => l.classList.remove("active-product"));
  this.classList.add("active-product");
}
linkProducts.forEach((l) => l.addEventListener("click", activeProducts));

//scroll up
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

//scroll section active link
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

//partials - test on prod
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded ");
  let includes = document.getElementsByTagName("include");
  for (var i = 0; i < includes.length; i++) {
    let include = includes[i];
    load_file(includes[i].attributes.src.value, function (text) {
      include.insertAdjacentHTML("afterend", text);
      include.remove();
    });
  }
  function load_file(filename, callback) {
    fetch(filename)
      .then((response) => response.text())
      .then((text) => callback(text));
  }
});

//formspree
var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Formularz wysłany!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Wystąpił problem z wysłaniem formularza.";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Wystąpił problem z wysłaniem formularza.";
    });
}
form.addEventListener("submit", handleSubmit);

console.log("main.js loaded");

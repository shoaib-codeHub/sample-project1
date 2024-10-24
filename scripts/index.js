const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Adding animation delays to nav items
navLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
});

window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const wrapper = document.querySelector(".wrapper");
const crousal = document.querySelector(".crousal");
const arrowButtons = document.querySelectorAll(".wrapper i");
const firstCardWidth = crousal.querySelector(".card").offsetWidth;
const crousalChildren = [...crousal.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(crousal.offsetWidth / firstCardWidth);

crousalChildren.slice(-cardPerView).reverse().forEach(card => {
    crousal.insertAdjacentHTML("afterbegin", card.outerHTML);
});

crousalChildren.slice(0, cardPerView).reverse().forEach(card => {
    crousal.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        crousal.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    crousal.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = crousal.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent any default behavior during dragging
    let positionDiff = e.pageX - startX; 
    crousal.scrollLeft = startScrollLeft - positionDiff;
};


const dragstop = () => {
    isDragging = false;
    crousal.classList.remove("dragging");
}

const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => crousal.scrollLeft += firstCardWidth, 2500)
}
autoPlay();
const infiniteScroll = () => {
    if (crousal.scrollLeft === 0) {
        crousal.classList.add("no-transition");
        crousal.scrollLeft = crousal.scrollWidth - (2 * crousal.offsetWidth);
        crousal.classList.remove("no-transition");
    } else if (Math.ceil(crousal.scrollLeft) === crousal.scrollWidth - crousal.offsetWidth) {
        crousal.classList.add("no-transition");
        crousal.scrollLeft = crousal.offsetWidth;
        crousal.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover"))autoPlay(); 
}

crousal.addEventListener("mousedown", dragStart);
crousal.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);
crousal.addEventListener("scroll", infiniteScroll);
crousal.addEventListener("mouseenter", () => clearTimeout(timeoutId));
crousal.addEventListener("mouseleave", autoPlay);


function animateCount(id, start, end, duration) {
    let range = end - start;
    let stepTime = Math.abs(Math.floor(duration / range));
    let element = document.getElementById(id);
    let current = start;
    let increment = end > start ? 1 : -1;
    
    let timer = setInterval(function() {
        current += increment;
        element.textContent = current + element.textContent.replace(/[\d]/g, '');
        
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Set values and durations for each element
animateCount("listings", 0, 90, 7000); // 90K listings
animateCount("categories", 0, 40, 7000); // 40K Listings Categories
animateCount("visitors", 0, 65, 7000); // 65K Visitors
animateCount("clients", 0, 50, 7000); // 50K Happy Clients

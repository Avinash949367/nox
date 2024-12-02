const products = [
    { id: 1, name: "Echo Dot (4th Gen)", price: 49.99, image: "https://redington-prod-data-product-images.s3.ap-south-1.amazonaws.com/AMZNGT5051/AMZNGT5051_4.png" },
    { id: 2, name: "Fire TV Stick", price: 39.99, image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1649744040/Croma%20Assets/Entertainment/Media%20Streaming%20Devices/Images/250408_bdaqku.png" },
    { id: 3, name: "Kindle Paperwhite", price: 129.99, image: "https://www.jiomart.com/images/product/original/rvpc1jub9i/proelite-smart-deer-flip-case-cover-for-amazon-kindle-paperwhite-6-8-11th-generation-wine-red-fits-signature-edition-also-product-images-orvpc1jub9i-p593099781-0-202207260854.jpg?im=Resize=(1000,1000)" },
    { id: 4, name: "Apple AirPods", price: 199.99, image: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg" },
    { id: 5, name: "Samsung Galaxy S21", price: 799.99, image: "https://rukminim2.flixcart.com/image/750/900/xif0q/mobile/d/o/r/-original-imagu4haetzha9bj.jpeg?q=20&crop=false" },
    { id: 6, name: "Sony WH-1000XM4", price: 348.00, image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1669124939/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/262565_0_gsz0tr.png" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load Products into the page
function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";  // Clear previous product listings

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px; object-fit: cover;">
            <h3>${product.name}</h3>
            <p>₹${(product.price * 80).toFixed(2)}</p> <!-- Assuming 1 USD = 80 INR -->
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add Product to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update the Cart Item Count
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// Promo Image Carousel functionality
const promoImages = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/BFCM/WA_Ethnic_PC_2X._CB540703489_.jpg",  // Image 1 URL
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/SVD/Dec/GW/SVD_PC_Hero_3000X1200_02._CB540782194_.jpg",  // Image 2 URL
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/Nov_New_3000x1200._CB542180708_.jpg",  // Image 3 URL
];

let currentIndex = 0;
const promoImgElement = document.querySelector('.promo-img');

// Change the promo image every 1.5 seconds
function changePromoImage() {
    currentIndex = (currentIndex + 1) % promoImages.length;
    promoImgElement.src = promoImages[currentIndex];
}

setInterval(changePromoImage, 1500);

// Carousel Scroll functionality
function scrollCarousel(direction) {
    const carouselTrack = document.querySelector('.carousel-track');
    const itemWidth = document.querySelector('.carousel-item').offsetWidth;
    const totalItems = document.querySelectorAll('.carousel-item').length;
    const maxIndex = totalItems - 1; // Maximum index position (last item)

    // Update current index
    currentIndex += direction;

    // Ensure the index stays within the bounds of the carousel
    if (currentIndex < 0) {
        currentIndex = 0; // Prevent scrolling before the first item
    }
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex; // Prevent scrolling after the last item
    }

    // Scroll the carousel track to the new position
    carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Update visibility of arrows
    updateArrowVisibility();
}

// Update visibility of carousel arrows
function updateArrowVisibility() {
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const totalItems = document.querySelectorAll('.carousel-item').length;

    // If we're at the first item, hide the previous button
    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    // If we're at the last item, hide the next button
    if (currentIndex === totalItems - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}

// Initialize everything when page is loaded
window.onload = function() {
    loadProducts(); // Load the product listings
    updateCartCount(); // Update the cart count
    updateArrowVisibility(); // Update carousel arrows
}

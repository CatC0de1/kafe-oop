document.addEventListener('DOMContentLoaded', () => {
    const promoContainer = document.querySelector('.promo-container');
    const promoItems = document.querySelectorAll('.promo-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showPromo(index) {
        promoContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextPromo() {
        currentIndex = (currentIndex + 1) % promoItems.length;
        showPromo(currentIndex);
    }

    function prevPromo() {
        currentIndex = (currentIndex - 1 + promoItems.length) % promoItems.length;
        showPromo(currentIndex);
    }

    nextButton.addEventListener('click', nextPromo);
    prevButton.addEventListener('click', prevPromo);

    setInterval(nextPromo, 5000);
});

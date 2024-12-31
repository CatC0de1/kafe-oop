export class PromoCarousel {
    constructor(promoContainerSelector, promoItemSelector, prevButtonSelector, nextButtonSelector) {
        this.promoContainer = document.querySelector(promoContainerSelector);
        this.promoItems = document.querySelectorAll(promoItemSelector);
        this.prevButton = document.querySelector(prevButtonSelector);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.nextButton.addEventListener('click', () => this.nextPromo());
        this.prevButton.addEventListener('click', () => this.prevPromo());
        setInterval(() => this.nextPromo(), 5000);
    }

    showPromo(index) {
        this.promoContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    nextPromo() {
        this.currentIndex = (this.currentIndex + 1) % this.promoItems.length;
        this.showPromo(this.currentIndex);
    }

    prevPromo() {
        this.currentIndex = (this.currentIndex - 1 + this.promoItems.length) % this.promoItems.length;
        this.showPromo(this.currentIndex);
    }
}
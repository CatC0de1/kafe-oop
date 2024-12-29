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

function cekDiskon(pesanan) {
    let totalHarga = pesanan.reduce((total, item) => total + item.harga, 0);
    let discountInfo = '';

    const countItem = (nama) => pesanan.filter(item => item.nama === nama).length;

    if (countItem("Nasi Goreng") >= 3 && countItem("Mie Goreng") >= 2) {
        const diskon = 0.2 * (pesanan.find(item => item.nama === "Nasi Goreng").harga * 3 +
                              pesanan.find(item => item.nama === "Mie Goreng").harga * 2);
        totalHarga -= diskon;
        discountInfo += "Anda mendapatkan diskon 20% untuk 3 Nasi Goreng dan 2 Mie Goreng! ";
    }

    if (countItem("Bakso") >= 1 && countItem("Es Teh") >= 1) {
        const diskon = 0.1 * (pesanan.find(item => item.nama === "Bakso").harga +
                              pesanan.find(item => item.nama === "Es Teh").harga);
        totalHarga -= diskon;
        discountInfo += "Anda mendapatkan diskon 10% untuk Paket Bakso! ";
    }

    if (countItem("Ayam Bakar") >= 2 && countItem("Es Teh") >= 1) {
        const esTehHarga = pesanan.find(item => item.nama === "Es Teh").harga;
        totalHarga -= esTehHarga;
        discountInfo += "Anda mendapatkan Es Teh gratis! ";
    }

    return { totalHarga, discountInfo };
}

// document.addEventListener('DOMContentLoaded', () => {
//     const promoCarousel = new PromoCarousel('.promo-container', '.promo-item', '.prev', '.next');
// });
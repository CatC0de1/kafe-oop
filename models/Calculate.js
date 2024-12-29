class Calculate {
  constructor(makanan, minuman, pesanan) {
    this.makanan = makanan;
    this.minuman = minuman;
    this.pesanan = pesanan;
    this.discountMessage = '';
  }

  diskon() {
    let totalHarga = this.pesanan.reduce((total, item) => total + item.price * item.quantity, 0);
    let discountMessages = [];

    // Diskon 20% untuk 3 Nasi Goreng dan 2 Mie Goreng
    const nasiGorengCount = this.pesanan.filter(item => item.name === "Nasi Goreng").reduce((sum, item) => sum + item.quantity, 0);
    const mieGorengCount = this.pesanan.filter(item => item.name === "Mie Goreng").reduce((sum, item) => sum + item.quantity, 0);
    if (nasiGorengCount >= 3 && mieGorengCount >= 2) {
        const nasiGorengPrice = this.pesanan.find(item => item.name === "Nasi Goreng").price;
        const mieGorengPrice = this.pesanan.find(item => item.name === "Mie Goreng").price;
        const diskon = 0.2 * (nasiGorengPrice * 3 + mieGorengPrice * 2);
        totalHarga -= Math.floor(diskon);
        discountMessages.push("- Anda mendapatkan diskon 20% untuk diskon DUARR!");
    }

    // Diskon 10% untuk Paket Bakso dan Teh
    const baksoCount = this.pesanan.filter(item => item.name === "Bakso").reduce((sum, item) => sum + item.quantity, 0);
    const tehPrice = this.pesanan.filter(item => item.name === "Teh").reduce((sum, item) => sum + item.quantity, 0);
    if (baksoCount >= 1 && tehPrice >= 1) {
        const baksoPrice = this.pesanan.find(item => item.name === "Bakso").price;
        const esTehPrice = this.pesanan.find(item => item.name === "Teh").price;
        const diskon = 0.1 * (baksoPrice + esTehPrice);
        totalHarga -= Math.floor(diskon);
        discountMessages.push("- Anda mendapatkan diskon 10% untuk Paket Super Hemat!");
    }

    // Teh gratis untuk 2 Ayam Bakar dan 1 Teh
    const ayamBakarCount = this.pesanan.filter(item => item.name === "Ayam Bakar").reduce((sum, item) => sum + item.quantity, 0);
    if (ayamBakarCount >= 2 && tehPrice >= 1) {
        const esTehPrice = this.pesanan.find(item => item.name === "Teh").price;
        totalHarga -= esTehPrice;
        discountMessages.push("- Anda mendapatkan Teh gratis!");
    }

    this.discountMessage = discountMessages.join(' ');
    return totalHarga;
  }
}

module.exports = Calculate;

const Discount = require('./Discount.js');

class DiskonDuar extends Discount {
  apply(order) {
    const nasiGorengCount = order.filter(item => item.name === "Nasi Goreng").reduce((sum, item) => sum + item.quantity, 0);
    const mieGorengCount = order.filter(item => item.name === "Mie Goreng").reduce((sum, item) => sum + item.quantity, 0);

    if (nasiGorengCount >= 3 && mieGorengCount >= 2) {
      const nasiGorengPrice = order.find(item => item.name === "Nasi Goreng").price;
      const mieGorengPrice = order.find(item => item.name === "Mie Goreng").price;
      return 0.2 * (nasiGorengPrice * 3 + mieGorengPrice * 2);
    }
    return 0;
  }

  getMessage() {
    return "- Anda mendapatkan diskon 20% untuk diskon DUARR!";
  }
}


module.exports = DiskonDuar;
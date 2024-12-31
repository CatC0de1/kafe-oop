const Discount = require('./Discount.js');

class GratisTeh extends Discount {
  apply(order) {
    const ayamBakarCount = order.filter(item => item.name === "Ayam Bakar").reduce((sum, item) => sum + item.quantity, 0);
    const tehCount = order.filter(item => item.name === "Teh").reduce((sum, item) => sum + item.quantity, 0);

    if (ayamBakarCount >= 2 && tehCount >= 1) {
      const tehPrice = order.find(item => item.name === "Teh").price;
      return tehPrice;
    }
    return 0;
  }

  getMessage() {
    return "- Anda mendapatkan Teh gratis!";
  }
}

module.exports = GratisTeh;

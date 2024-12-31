const Discount = require('./Discount.js');

class PaketSuperHemat extends Discount {
  apply(order) {
    const baksoCount = order.filter(item => item.name === "Bakso").reduce((sum, item) => sum + item.quantity, 0);
    const tehCount = order.filter(item => item.name === "Teh").reduce((sum, item) => sum + item.quantity, 0);

    if (baksoCount >= 1 && tehCount >= 1) {
      const baksoPrice = order.find(item => item.name === "Bakso").price;
      const tehPrice = order.find(item => item.name === "Teh").price;
      return 0.1 * (baksoPrice + tehPrice);
    }
    return 0;
  }

  getMessage() {
    return "- Anda mendapatkan diskon 10% untuk Paket Super Hemat!";
  }
}

module.exports = PaketSuperHemat;

const DiskonDuar = require('./promos/DiskonDuar');
const PaketSuperHemat = require('./promos/PaketSuperHemat');
const GratisTeh = require('./promos/GratisTeh');

class Calculate {
  constructor(order) {
    this.order = order;
    this.discountMessage = '';
    this.discounts = [
      new DiskonDuar(),
      new PaketSuperHemat(),
      new GratisTeh(),
    ];
  }

  discount() {
    let total = this.order.reduce((total, item) => total + item.price * item.quantity, 0);
    let discountMessages = [];

    for (const discount of this.discounts) {
      const discountAmount = discount.apply(this.order);
      if (discountAmount > 0) {
        total -= Math.floor(discountAmount);
        discountMessages.push(discount.getMessage());
      }
    }

    this.discountMessage = discountMessages.join(' ');
    return total;
  }
}

module.exports = Calculate;
// // Abstract class
// class Discount {
//   apply(order) {
//     throw new Error("Method 'apply()' harus diimplementasikan di subclass");
//   }

//   getMessage() {
//     throw new Error("Method 'getMessage()' harus diimplementasikan di subclass");
//   }
// }

// // Diskon 20% untuk 3 nasgor dan migor
// class DiskonDuar extends Discount {
//   apply(order) {
//     const nasiGorengCount = order.filter(item => item.name === "Nasi Goreng").reduce((sum, item) => sum + item.quantity, 0);
//     const mieGorengCount = order.filter(item => item.name === "Mie Goreng").reduce((sum, item) => sum + item.quantity, 0);

//     if (nasiGorengCount >= 3 && mieGorengCount >= 2) {
//       const nasiGorengPrice = order.find(item => item.name === "Nasi Goreng").price;
//       const mieGorengPrice = order.find(item => item.name === "Mie Goreng").price;
//       return 0.2 * (nasiGorengPrice * 3 + mieGorengPrice * 2);
//     }
//     return 0;
//   }

//   getMessage() {
//     return "- Anda mendapatkan diskon 20% untuk diskon DUARR!";
//   }
// }

// // Diskon 10% untuk Bakso and Teh
// class PaketSuperHemat extends Discount {
//   apply(order) {
//     const baksoCount = order.filter(item => item.name === "Bakso").reduce((sum, item) => sum + item.quantity, 0);
//     const tehCount = order.filter(item => item.name === "Teh").reduce((sum, item) => sum + item.quantity, 0);

//     if (baksoCount >= 1 && tehCount >= 1) {
//       const baksoPrice = order.find(item => item.name === "Bakso").price;
//       const tehPrice = order.find(item => item.name === "Teh").price;
//       return 0.1 * (baksoPrice + tehPrice);
//     }
//     return 0;
//   }

//   getMessage() {
//     return "- Anda mendapatkan diskon 10% untuk Paket Super Hemat!";
//   }
// }

// // Gratis Teh untuk 2 Ayam Bakar
// class GratisTeh extends Discount {
//   apply(order) {
//     const ayamBakarCount = order.filter(item => item.name === "Ayam Bakar").reduce((sum, item) => sum + item.quantity, 0);
//     const tehCount = order.filter(item => item.name === "Teh").reduce((sum, item) => sum + item.quantity, 0);

//     if (ayamBakarCount >= 2 && tehCount >= 1) {
//       const tehPrice = order.find(item => item.name === "Teh").price;
//       return tehPrice;
//     }
//     return 0;
//   }

//   getMessage() {
//     return "- Anda mendapatkan Teh gratis!";
//   }
// }

// class Calculate {
//   constructor(order) {
//     this.order = order;
//     this.discountMessage = '';
//     this.discounts = [
//       new DiskonDuar(),
//       new PaketSuperHemat(),
//       new GratisTeh()
//     ];
//   }

//   discount() {
//     let total = this.order.reduce((total, item) => total + item.price * item.quantity, 0);
//     let discountMessages = [];

//     for (const discount of this.discounts) {
//       const discountAmount = discount.apply(this.order);
//       if (discountAmount > 0) {
//         total -= Math.floor(discountAmount);
//         discountMessages.push(discount.getMessage());
//       }
//     }

//     this.discountMessage = discountMessages.join(' ');
//     return total;
//   }
// }

// module.exports = Calculate;



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
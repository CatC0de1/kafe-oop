import BaseUx from './base.js';
import { MenuModal } from './menuModal.js';
import { PromoCarousel } from './promo.js';
import { OrderManager } from './order.js';

class Controller {
  constructor() {
    this.baseUx = new BaseUx();
    this.menuModal = null;
    this.orderManager = null;
    this.init();
  }

  // method inisialisasi untuk menangkap propety2 dalam html/ejs
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const promoCarousel = new PromoCarousel('.promo-container', '.promo-item', '.prev', '.next');

      this.menuModal = new MenuModal('menuModal', 'quantity', 'tipe', 'quantityIncrease', 'quantityDecrease', 'menuModalClose');
      window.menuModal = this.menuModal;
      this.setupMenuItems();

      this.orderManager = new OrderManager('orderModal', 'orderModalClose', 'orderList', 'payButton', 'confirmButton');
      window.orderManager = this.orderManager;
      this.setupOrder();
    });
  }

  // mengatur menu agar modal menu dapat ditampilkan
  setupMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const itemId = item.dataset.id;
        const collectionName = item.dataset.collection;

        if (window.menuModal) {
          window.menuModal.openModal(itemId, collectionName);
        }
      });
    });
  }

  // mengatur order agar pesanan dapat ditampilkan serta modal dari order dapat ditampilkan
  setupOrder() {
    const checkoutButton = document.querySelector('.pay-button');
    checkoutButton.addEventListener('click', () => {
      if (window.orderManager) {
        window.orderManager.displayOrderModal();
        window.orderManager.openOrderModal();
      }
    });
  }
}

new Controller();
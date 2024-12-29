export class MenuModal {
  // class MenuModal {
  constructor(modalId, quantityId, tipeId, quantityIncreaseId, quantityDecreaseId, closeId) {
    this.modal = document.getElementById(modalId);
    this.quantityElement = document.getElementById(quantityId);
    this.tipeElement = document.getElementById(tipeId);
    this.quantityIncrease = document.getElementById(quantityIncreaseId);
    this.quantityDecrease = document.getElementById(quantityDecreaseId);
    this.menuModalClose = document.getElementById(closeId);
    this.currentQuantity = 1;
    this.init();
  }

  init() {
    if (this.quantityIncrease) {
      this.quantityIncrease.addEventListener('click', () => {
        this.updateQuantity(1);
      });
    }

    if (this.quantityDecrease) {
      this.quantityDecrease.addEventListener('click', () => {
        this.updateQuantity(-1);
      });
    }

    if (this.menuModalClose) {
      this.menuModalClose.addEventListener('click', () => {
        this.close();
      });
    }

    this.modal.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.close();
      }
    });

    // document.querySelector('.menu-content').addEventListener('click', (event) => {
    //     event.stopPropagation();
    // });
  }

  async display(itemId, collectionName) {
    try {
      const response = await fetch(`/api/${collectionName}/${itemId}`);
      const item = await response.json();

      document.getElementById('menuName').textContent = item.name;
      document.getElementById('menuImage').src = item.image;
      document.getElementById('menuImage').alt = item.name;
      document.getElementById('menuDescription').textContent = item.description;
      document.getElementById('menuPrice').textContent = `Rp ${item.price}`;

      if (item.types === true) {
        this.tipeElement.style.display = 'flex';
      } else {
        this.tipeElement.style.display = 'none';
      }

      this.modal.classList.remove('hidden');
    } catch (error) {
      console.error('Gagal mendapatkan data item:', error);
    }
  }

  updateQuantity(change) {
    // Correctly update the quantity
    this.currentQuantity += change;

    // Ensure quantity stays within valid bounds (at least 1)
    this.currentQuantity = Math.max(1, this.currentQuantity);
    this.quantityElement.textContent = this.currentQuantity; // Update the displayed quantity
  }

  close() {
    this.modal.classList.add('hidden');
    this.currentQuantity = 1;
    this.quantityElement.textContent = this.currentQuantity;

    const toggleSwitch = document.querySelector('#tipe .switch input[type="checkbox"]');
    if (toggleSwitch) toggleSwitch.checked = false;
  }

  openModal(itemId, collectionName) {
    this.display(itemId, collectionName);
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   window.menuModal = new MenuModal('menuModal', 'quantity', 'tipe', 'quantityIncrease', 'quantityDecrease', 'menuModalClose');
// });


// import { MenuModal } from './menuModal.js';

// class Logic {
//     constructor() {
//         this.menuModal = null;
//         this.init();
//     }

//     init() {
//         // Inisialisasi MenuModal setelah DOM siap
//         document.addEventListener('DOMContentLoaded', () => {
//             this.initializeMenuModal();
//             this.setupMenuItems();
//             console.log('Logic initialized');
//         });
//     }

//     initializeMenuModal() {
//         // Membuat instance MenuModal
//         this.menuModal = new MenuModal(
//             'menuModal',          // ID modal
//             'quantity',           // ID elemen jumlah
//             'tipe',               // ID elemen tipe
//             'quantityIncrease',   // ID tombol tambah jumlah
//             'quantityDecrease',   // ID tombol kurang jumlah
//             'menuModalClose'      // ID tombol tutup
//         );
//         console.log('MenuModal initialized:', this.menuModal);
//     }

//     setupMenuItems() {
//         // Menambahkan event listener pada setiap item menu
//         const menuItems = document.querySelectorAll('.menu-item');
//         menuItems.forEach(item => {
//             item.addEventListener('click', () => {
//                 const itemId = item.dataset.id; // ID dari atribut data-id
//                 const collectionName = 'menu'; // Sesuaikan dengan nama koleksi data API
//                 this.menuModal.openModal(itemId, collectionName);
//             });
//         });

//         console.log('Menu items event listeners added.');
//     }
// }

// // Inisialisasi Logic
// new Logic();

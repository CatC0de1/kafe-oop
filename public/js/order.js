export class OrderManager {
  constructor(orderModalId, orderModalCloseId, orderListId, payButtonId, confirmButtonId) {
    this.orderModal = document.getElementById(orderModalId);
    this.orderModalClose = document.getElementById(orderModalCloseId);
    this.orderList = document.getElementById(orderListId);
    this.payButton = document.getElementById(payButtonId);
    this.confirmButton = document.getElementById(confirmButtonId);
    this.currentQuantity = 1;
    this.init();
  }

  init() {
    document.querySelector('.checkout .main ul').addEventListener('click', (event) => {
      if (event.target.closest('.delete-order')) {
        const index = event.target.closest('li').getAttribute('data-index');
        this.removeOrder(index);
      }
    });

    this.orderModalClose.addEventListener('click', (event) => {
      if (event.target === this.orderModalClose) {
        this.closeOrderModal();
      }
    });

    this.payButton.addEventListener('click', () => {
      this.displayOrderModal();
      this.openOrderModal();
    });

    this.orderModal.addEventListener('click', (event) => {
      if (event.target === this.orderModal) {
        this.closeOrderModal();
      }
    });

    this.confirmButton.addEventListener('click', () => {
      this.confirmOrder();
    });

    this.displayOrders();
  }

  addToOrder() {
    const itemName = document.getElementById('menuName').textContent;
    const itemPrice = parseInt(document.getElementById('menuPrice').textContent.replace('Rp ', ''));
    const itemQuantity = window.menuModal.currentQuantity;
    const itemTypeElement = document.querySelector('#tipe .switch input[type="checkbox"]');
    const itemType = itemTypeElement && itemTypeElement.checked ? 'Iced' : 'Hot';

    const order = {
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity
    };

    if (itemTypeElement && itemTypeElement.style.display !== 'none') {
      order.type = itemType;
    }

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    window.menuModal.close();
    this.displayOrders();
    window.menuModal.currentQuantity = 1; // Reset quantity after adding to order
  }

  displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.querySelector('.checkout .main ul');
    orderList.innerHTML = '';

    if (orders.length > 0) {
      orders.forEach((order, index) => {
        const orderItem = document.createElement('li');
        orderItem.setAttribute('data-index', index);
        orderItem.innerHTML = `
                    <div>${order.name}${order.type && order.type !== 'Hot' ? ` (${order.type})` : ''} x${order.quantity}</div>
                    <div>Rp ${order.price * order.quantity}</div>
                    <div class="delete-order">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                        </svg>
                    </div>
                `;
        orderList.appendChild(orderItem);
      });
    } else {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'Tidak ada pesanan saat ini.';
      orderList.appendChild(emptyMessage);
    }

    this.updateTotal();
  }

  updateTotal() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const total = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
    document.querySelector('.checkout .total span').textContent = `Rp ${total}`;
    this.updateDiscountInfo(orders);
  }

  async updateDiscountInfo(orders) {
    const discountInfo = await this.fetchDiscountInfo(orders);
    document.getElementById('orderTotal').textContent = discountInfo.total;

    const discountInfoElement = document.getElementById('discountInfo');
    if (discountInfo.message) {
        const discountMessages = discountInfo.message.split('!');
        discountInfoElement.innerHTML = discountMessages.filter(message => message.trim()).map(message => `<div>${message.trim()}!</div>`).join('');
    } else {
        discountInfoElement.innerHTML = '';
    }
  }

  updatePayButtonState() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
      this.payButton.classList.add('disabled');
    } else {
      this.payButton.classList.remove('disabled');
    }
  }

  removeOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    this.displayOrders();
  }

  async displayOrderModal() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    if (orders.length > 0) {
      orders.forEach((order, index) => {
        const orderItem = document.createElement('li');
        orderItem.setAttribute('data-index', index);
        orderItem.innerHTML = `
                    <div>${order.name}${order.type && order.type !== 'Hot' ? ` (${order.type})` : ''} x${order.quantity}</div>
                    <div>Rp ${order.price * order.quantity}</div>
                `;
        orderList.appendChild(orderItem);
      });

      const discountInfo = await this.fetchDiscountInfo(orders);
      document.getElementById('orderTotal').textContent = discountInfo.total;

      const discountInfoElement = document.getElementById('discountInfo');
      if (discountInfo.message) {
        const discountMessages = discountInfo.message.split('!');
        discountInfoElement.innerHTML = discountMessages.filter(message => message.trim()).map(message => `<div>${message.trim()}!</div>`).join('');
      } else {
        discountInfoElement.innerHTML = '';
      }
    } else {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'Tidak ada pesanan saat ini.';
      orderList.appendChild(emptyMessage);

      document.getElementById('orderTotal').textContent = '0';
      document.getElementById('discountInfo').innerHTML = '';
    }
  }

  async fetchDiscountInfo(orders) {
    try {
      const response = await fetch('/api/calculateDiscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orders })
      });
      return await response.json();
    } catch (error) {
      console.error('Gagal mendapatkan informasi diskon:', error);
      return { message: 'Tidak ada diskon', total: this.calculateTotal(orders) };
    }
  }

  calculateTotal(orders) {
    return orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  }

  closeOrderModal() {
    this.orderModal.classList.add('hidden');
  }

  openOrderModal() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
      return;
    }
    this.orderModal.classList.remove('hidden');
  }

  async printReceipt() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const discountInfo = await this.fetchDiscountInfo(orders);
    const receiptContent = orders.map(order => {
      return `${order.name}${order.type && order.type !== 'Hot' ? ` (${order.type})` : ''} x${order.quantity} - Rp ${order.price * order.quantity}`;
    }).join('\n');

    const totalContent = `Total: Rp ${discountInfo.total}`;
    const discountContent = discountInfo.message ? `Diskon: ${discountInfo.message}` : '';

    const receipt = `${receiptContent}\n${discountContent}\n${totalContent}`;

    try {
      await fetch('/api/printReceipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receipt })
      });
      alert('Struk telah dicetak!');
      localStorage.removeItem('orders');
      this.displayOrders();
    } catch (error) {
      console.error('Gagal mencetak struk:', error);
    }
  }

  confirmOrder() {
    this.printReceipt();
    this.closeOrderModal();
  }

  hitungTotal(pesanan) {
    return pesanan.reduce((total, item) => total + item.harga, 0);
  }
}
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

        this.orderModalClose.addEventListener('click', () => {
          if (event.target === this.orderModalClose) {
            this.closeOrderModal();
          }
        });

        this.payButton.addEventListener('click', () => {
          if (event.target === this.payButton) {
            this.displayOrderModal();
            this.openOrderModal();
          }
        });

        this.orderModal.addEventListener('click', (event) => {
          if (event.target === this.orderModal) {
            this.closeOrderModal();
          }
        });

        this.confirmButton.addEventListener('click', () => {
          if (event.target === this.confirmButton) {
            this.confirmOrder();
          }
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
    }

    async applyDiscount() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const response = await fetch('/apply-discount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orders })
        });
        const data = await response.json();
        alert(`Total harga setelah diskon: Rp ${data.total}`);
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
        } else {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Tidak ada pesanan saat ini.';
            orderList.appendChild(emptyMessage);
        }

        try {
            const response = await fetch('/apply-discount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orders })
            });
            const data = await response.json();
            document.getElementById('orderTotal').textContent = `Rp ${data.total}`;
            document.getElementById('discountInfo').textContent = data.discountInfo || '';
        } catch (error) {
            console.error('Error fetching discount:', error);
            document.getElementById('discountInfo').textContent = 'Error applying discount';
        }
    }

    closeOrderModal() {
        this.orderModal.classList.add('hidden');
    }

    openOrderModal() {
        this.orderModal.classList.remove('hidden');
    }

    confirmOrder() {
        alert('Pesanan Anda telah dikonfirmasi!');
        this.closeOrderModal();
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     window.orderManager = new OrderManager('orderModal', 'orderModalClose', 'orderList', 'payButton');
// });
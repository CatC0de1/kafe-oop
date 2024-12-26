async function openModal(itemId, collectionName) {
    try {
        const response = await fetch(`/api/${collectionName}/${itemId}`);
        const item = await response.json();

        document.getElementById('menuName').textContent = item.name;
        document.getElementById('menuImage').src = item.image;
        document.getElementById('menuImage').alt = item.name;
        document.getElementById('menuDescription').textContent = item.description;
        document.getElementById('menuPrice').textContent = `Rp ${item.price}`;

        if (item.types === true) {
            document.getElementById('tipe').style.display = 'flex';
        } else {
            document.getElementById('tipe').style.display = 'none';
        }

        document.getElementById('menuModal').classList.remove('hidden');
    } catch (error) {
        console.error('Gagal mendapatkan data item:', error);
    }
}

menuModal.onclick = function(event) {
  if (event.target == menuModal) {
    document.getElementById('menuModal').classList.add('hidden');
  }
};

let currentQuantity = 1;

function updateQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    currentQuantity = Math.max(1, currentQuantity + change);
    quantityElement.textContent = currentQuantity;
}

function closeModal() {
    const modal = document.getElementById('menuModal');
    modal.classList.add('hidden');

    const quantityElement = document.getElementById('quantity');
    currentQuantity = 1;
    quantityElement.textContent = currentQuantity;

    const toggleSwitch = document.querySelector('#tipe .switch input[type="checkbox"]');
    toggleSwitch.checked = false;
}


document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

document.addEventListener('selectstart', function(event) {
    event.preventDefault();
});
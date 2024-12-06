async function openModal(itemId, collectionName) {
    try {
        // Ambil data item berdasarkan ID
        const response = await fetch(`/api/${collectionName}/${itemId}`);
        const item = await response.json();

        // if (!item || !item.price) {
        //     console.error('Data item tidak valid:', item);
        //     alert('Gagal memuat data item. Silakan coba lagi.');
        //     return;
        // }

        document.getElementById('modalName').textContent = item.name;
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.name;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalPrice').textContent = `Rp ${item.price}`;

        if (item.types === true) {
            document.getElementById('tipe').style.display = 'flex';
        } else {
            document.getElementById('tipe').style.display = 'none'; // Sembunyikan jika types = false
        }

        document.getElementById('itemModal').classList.remove('hidden');
    } catch (error) {
        console.error('Gagal mendapatkan data item:', error);
    }
}

function closeModal() {
    document.getElementById('itemModal').classList.add('hidden');
}

// document.getElementById('closeModal').addEventListener('click', () => {
//     document.getElementById('itemModal').classList.add('hidden');
// });

itemModal.onclick = function(event) {
  if (event.target == itemModal) {
    document.getElementById('itemModal').classList.add('hidden');
  }
};

document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

document.addEventListener('selectstart', function(event) {
    event.preventDefault();
});
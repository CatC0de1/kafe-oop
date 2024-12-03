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

        // Tampilkan data di dalam modal
        document.getElementById('modalName').textContent = item.name;
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalImage').alt = item.name;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalPrice').textContent = `Rp ${item.price}`;

        // Tampilkan modal
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
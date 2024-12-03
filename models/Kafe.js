const express = require('express');
const axios = require('axios');

class Kafe {
    constructor(nama) {
        this.nama = nama;
        this.router = express.Router();
        this.initRoutes();
    }

    async fetchAllCollections() {
        try {
            const response = await axios.get('http://localhost:3003/api/allCollections');
            return response.data;
        } catch (error) {
            console.error('Gagal mendapatkan data dari API MongoDB:', error.message);
            return {};
        }
    }

    initRoutes() {
        this.router.get('/', async (req, res) => {
            const collections = await this.fetchAllCollections();

            res.render('index', {
                collections,
                title: this.nama,
            });
        });

        this.router.get('/api/:collectionName/:id', async (req, res) => {
            const { collectionName, id } = req.params;

            try {
                console.log('Menerima permintaan untuk item ID:', { collectionName, id });
                const response = await axios.get(`http://localhost:3003/api/${collectionName}/${id}`);
                console.log('Data item berhasil diambil:', response.data);

                res.json(response.data);
            } catch (error) {
                console.error('Gagal mendapatkan item:', error.message);
                console.error('Detail error:', error.response?.data || error);

                res.status(500).json({ error: 'Gagal medapatkan data item.'});
            }
        });
    }
}

module.exports = Kafe;
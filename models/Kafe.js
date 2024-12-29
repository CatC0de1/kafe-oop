const express = require('express');
const axios = require('axios');
// const { cekDiskon } = require('../public/js/order');

class Kafe {
    constructor(nama, mongoURI) {
        this.nama = nama;
        this.mongoURI =  mongoURI;
        this.router = express.Router();
        this.initRoutes();
    }

    async fetchAllCollections() {
        try {
            const response = await axios.get(`${this.mongoURI}/api/allCollections`);
            return response.data;
        } catch (error) {
            console.error('Gagal mendapatkan data dari API MongoDB: ', error.message);
            return {};
        }
    }

    async fetchPromoContent() {
        try {
            const response = await axios.get(`${this.mongoURI}/api/promo`);
            return response.data;
        } catch (error) {
            console.error('Gagal mendapatkan data dari API MongoDB: ', error.message);
            return [];
        }
    }

    hitungTotal(pesanan) {
        return pesanan.reduce((total, item) => total + item.harga, 0);
    }

    initRoutes() {
        this.router.get('/', async (req, res) => {
            const collections = await this.fetchAllCollections();
            const promoData = await this.fetchPromoContent();
            const orders = req.cookies && req.cookies.orders ? JSON.parse(req.cookies.orders) : [];
            const total = this.hitungTotal(orders);

            res.render('index', {
                collections,
                title: this.nama,
                promo: promoData,
                orders,
                total
            });
        });

        this.router.get('/api/:collectionName/:id', async (req, res) => {
            const { collectionName, id } = req.params;

            try {
                console.log('Menerima permintaan untuk item ID:', { collectionName, id });
                const response = await axios.get(`${this.mongoURI}/api/${collectionName}/${id}`);
                console.log('Data item berhasil diambil:', response.data);

                res.json(response.data);
            } catch (error) {
                console.error('Gagal mendapatkan item:', error.message);
                console.error('Detail error:', error.response?.data || error);

                res.status(500).json({ error: 'Gagal medapatkan data item.'});
            }
        });

        // this.router.post('/apply-discount', (req, res) => {
        //     try {
        //         const orders = req.body.orders || [];
        //         console.log('Received orders:', orders);
        //         const { totalHarga, discountInfo } = cekDiskon(orders);
        //         console.log('Calculated totalHarga:', totalHarga);
        //         console.log('Calculated discountInfo:', discountInfo);
        //         res.json({ total: totalHarga, discountInfo });
        //     } catch (error) {
        //         console.error('Error applying discount:', error);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     }
        // });
    }
}

module.exports = Kafe;
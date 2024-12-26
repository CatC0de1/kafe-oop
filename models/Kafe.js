const express = require('express');
const axios = require('axios');
// const { mongo } = require('mongoose');

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

    initRoutes() {
        this.router.get('/', async (req, res) => {
            const collections = await this.fetchAllCollections();
            const promoData = await this.fetchPromoContent();

            res.render('index', {
                collections,
                title: this.nama,
                promo: promoData,
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
    }
}

module.exports = Kafe;
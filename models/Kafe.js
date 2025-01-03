const express = require('express');
const axios = require('axios');
const fs = require('fs');
const Calculate = require('./Calculate');

class Kafe {
  constructor(nama, mongoURI) {
    this.nama = nama;
    this.mongoURI = mongoURI;
    this.router = express.Router();
    this.initRoutes();
  }

  // method mendapatkan collections dari KafeServer melalui API
  async fetchAllCollections() {
    try {
      const response = await axios.get(`${this.mongoURI}/api/allCollections`);
      return response.data;
    } catch (error) {
      console.error('Gagal mendapatkan data dari API MongoDB: ', error.message);
      return {};
    }
  }

  // method mendapatkan content promo dari KafeServer melalui API
  async fetchPromoContent() {
    try {
      const response = await axios.get(`${this.mongoURI}/api/promo`);
      return response.data;
    } catch (error) {
      console.error('Gagal mendapatkan data dari API MongoDB: ', error.message);
      return [];
    }
  }

  // method inisialisasi uuntuk merender halaman, menyiapkan data menu, data promo, dan logic untuk print receipt
  initRoutes() {
    this.router.get('/', async (req, res) => {
      const collections = await this.fetchAllCollections();
      const promoData = await this.fetchPromoContent();
      const orders = req.cookies && req.cookies.orders ? JSON.parse(req.cookies.orders) : [];

      res.render('index', {
        collections,
        title: this.nama,
        promo: promoData,
        orders,
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

        res.status(500).json({ error: 'Gagal medapatkan data item.' });
      }
    });

    this.router.post('/api/calculateDiscount', (req, res) => {
      const { orders } = req.body;
      const calculate = new Calculate(orders);
      const total = calculate.discount();
      res.json({ message: calculate.discountMessage, total });
    });

    this.router.post('/api/printReceipt', (req, res) => {
      const { receipt } = req.body;
      fs.writeFile('receipt.txt', receipt, (err) => {
        if (err) {
          console.error('Gagal mencetak struk:', err);
          return res.status(500).json({ error: 'Gagal mencetak struk.' });
        }
        res.json({ message: 'Struk telah dicetak!' });
      });
    });
  }
}

module.exports = Kafe;
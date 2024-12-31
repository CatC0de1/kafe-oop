const express = require('express');
const path = require('path');
const Kafe = require('./models/Kafe');

class App {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.kafe = new Kafe('LHA IKI KAFE', 'http://localhost:5000');
    this.initMiddleware();
    this.initEjs();
    this.initStatic();
    this.initRoutes();
  }

  // inisialisasi EJS
  initEjs() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
  }

  // inisialisasi static file
  initStatic() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  // inisialisasi middleware
  initMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // inisialiasi routes
  initRoutes() {
    this.app.use('/', this.kafe.router);
  }

  // menjalankan App
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server sedang berjalan di http://localhost:${this.port}`);
    });
  }
}


const app = new App(3004);
app.start();

// run sass   : npm run sass
// run webpack: npm run build
const express = require('express');
// const fs = require('fs');
const path = require('path');
const Kafe = require('./models/Kafe');

class App {
    constructor(port) {
      this.app = express();
      this.port = port;
      this.kafe = new Kafe('LHA IKI KAFE', 'http://localhost:5000');
      this.initMiddleware();
      this.initEjs();
      this.initRoutes();
    }

    initEjs() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    initMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initRoutes() {
        this.app.use('/', this.kafe.router);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server sedang berjalan di http://localhost:${this.port}`);
        });
    }
}


const app = new App(3004);
app.start();

// sass --watch public/css/index.scss:public/css/index.css
const express = require('express');
const config = require('../config');
const cors = require('cors');
const cookie = require('cookie-parser');
const routes = require('./routers');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + '/public'));
app.use(express.static(process.cwd() + '/src/views'));
app.use(express.static(process.cwd() + '/uploads'));
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

app.get('/', (req, res) => {
    res.render("index");
});
// Fayllarni yuklab olish uchun route
app.get('/download/:type/:filename', (req, res) => {
    const { type, filename } = req.params;
    const filepath = path.join(__dirname, 'uploads', filename);
console.log(filepath);
    // Fayl mavjudligini tekshirish
    if (fs.existsSync(filepath)) {
        res.download(filepath, (err) => {
            if (err) {
                console.error('Fayl yuklab olishda xatolik yuz berdi:', err);
                res.status(500).send('Fayl yuklab olishda xatolik yuz berdi');
            }
        });
    } else {
        res.status(404).send('Fayl topilmadi');
    }

});
app.get('/login_page',(req,res)=>{
    res.render('Login');
})

app.get('/register_page',(req,res)=>{
    res.render('Register');
})

app.use(routes);
app.listen(config.port, () => {
    console.log(`Server running on port: ${config.port}`);
});

const { TesseractOCR, upload, download } = require('../controllers/ocr.controller');


const router=require('express').Router()

// Rasmlarni qabul qilish va OCR-ni bajarish
router.post('/upload', upload.single('image'), TesseractOCR);

module.exports=router
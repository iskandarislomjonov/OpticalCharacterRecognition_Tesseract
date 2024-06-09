const multer = require("multer");
const Tesseract=require('tesseract.js')
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const path=require('path');
const  PDFDocument  = require('pdfkit');
// Multer bilan rasmlarni qabul qilish
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
// Response matnini txt faylga yozish funksiyasi
const saveTextAsTxt = (text, filepath) => {
    fs.writeFile(filepath, text, (err) => {
        if (err) {
            console.error('Txt faylga yozishda xatolik yuz berdi:', err);
        } else {
            console.log('Matn txt faylga muvaffaqiyatli yozildi');
        }
    });
};
// Response matnini doc faylga yozish funksiyasi
const saveTextAsDoc = async (text, filepath) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun(text)
                    ]
                })
            ]
        }]
    });
const buffer = await Packer.toBuffer(doc);
    fs.writeFile(filepath, buffer, (err) => {
        if (err) {
            console.error('Doc faylga yozishda xatolik yuz berdi:', err);
        } else {
            console.log('Matn doc  faylga muvaffaqiyatli yozildi');
        }
    });
};
const saveTextAsPdf = (text, filepath) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filepath));
    doc.text(text);
    doc.end();
    console.log('Matn pdf faylga muvaffaqiyatli yozildi');
};
// TesseractOCR funksiyasini yangilash
const TesseractOCR = (req, res) => {
    const image = req.file.path;
    Tesseract.recognize(
        image,
        'uzb',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        console.log(text);
        // Matnni txt va doc fayllarga yozish
        const txtFilePath = `uploads/recognized_${Date.now()}.txt`;
        const docFilePath = `uploads/recognized_${Date.now()}.docx`;
        const pdfFilePath = `uploads/recognized_${Date.now()}.pdf`;
        saveTextAsTxt(text, txtFilePath);
        saveTextAsDoc(text, docFilePath);
        saveTextAsPdf(text, pdfFilePath);
       
        res.render('result', {
            text,
            txtFilePath: path.basename(txtFilePath),
            docFilePath: path.basename(docFilePath),
            pdfFilePath: path.basename(pdfFilePath)
        });
       
    }).catch(error => {
        console.error('Tanishda xatolik yuz berdi:', error);
        res.status(500).send('Tanishda xatolik yuz berdi');
    });
};
module.exports = {
    TesseractOCR,
    upload,
};

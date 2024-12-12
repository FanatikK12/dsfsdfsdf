const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Ваши данные
const botToken = '7584473430:AAEIiKWC8QLTvXsL5t5PpdCMum4UkOZaMoM'; // Не показывать клиенту
const chatId = '-4702734460'; // Не показывать клиенту

app.use(express.json());
app.use(express.static('public')); // Для обслуживания статических файлов (HTML)

app.post('/send-message', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ success: false, error: 'No message provided' });
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                res.json({ success: true });
            } else {
                res.status(500).json({ success: false, error: data.description });
            }
        })
        .catch(error => {
            res.status(500).json({ success: false, error: error.message });
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

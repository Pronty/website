const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/save', (req, res) => {
    fs.writeFileSync('data.json', JSON.stringify(req.body));
    res.send({ status: 'ok' });
});

//app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express')
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');

app.use(express.json());

const saltRounds = 10;
const plainText = 'ReskillAmericans123';
let savedHash;

//HASHING PLAINTEXT PASSWORD AND INCLUDING SALTING
bcrypt.hash(plainText, saltRounds)
    .then(hash => {
        savedHash = hash;
    });

app.post('/pass', (req, res) => {
    const payload = req.body.pass;
    bcrypt.compare(payload, savedHash)
        .then(result => {
            return res.json({message: result})
        })
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});
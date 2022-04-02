const Joi = require('joi');
const express = require('express');
const app = express();
const cors = require('cors');

const mysql = require('mysql');
const { func } = require('joi');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'apple879',
    database: 'pricing'
});

app.use(express.json());
app.use(cors());

var history = [];

const getHistory = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM FuelQuote ORDER BY quote_date DESC', function (error, results, fields) {
            if (error) return reject(error);
            return resolve(results.map(v => Object.assign({}, v)));
        });
    });
};

const addQuote = (quote) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO FuelQuote (quote_date, delivery_date, delivery_address, gallons, ppg, total)'
            + 'VALUES (NOW(), ?, ?, ?, ?, ?)', [quote.delivery_date, quote.delivery_address,
            quote.gallons, quote.ppg, quote.total], (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
    });
};

const getDeliveryAddress = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE id=? LIMIT 1', [id], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result[0].address);
        })
    })
};


function validateQuote(quote) {
    const schema = Joi.object({
        quote_date: Joi.date().max('now').required(),
        gallons: Joi.number().min(1).required(),
        delivery_date: Joi.date().min('now').required(),
        delivery_address: Joi.string().required(),
        ppg: Joi.number().greater(1).less(100).required(),
        total: Joi.number().required()
    })
    return schema.validate(quote);
}

app.get('/api/history', async (req, res) => {
    try {
        const resultElements = await getHistory();
        res.status(200).json(resultElements); // send a json response
    } catch (e) {
        console.log(e); // console log the error so we can see it in the console
        res.sendStatus(500);
    }
});

app.post('/api/history', async (req, res) => {
    const { error } = validateQuote(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });
    try {
        const result = await addQuote(req.body);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.get('/api/address/:id', async (req, res) => {
    try {
        const result = await getDeliveryAddress(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
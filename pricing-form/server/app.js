const Joi = require('joi');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const history = [
    {
        quote_date: '2022-03-12',
        gallons: 3,
        delivery_date: '2022-05-13',
        delivery_address: '2123 Glover Way',
        ppg: 34.35,
        total: 103.05
    }
];

const users = [
    {
        'id': 0,
        'address': '1234 Calhoun Way'
    }
]

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

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/api/history', (req, res) => res.send(history));

app.post('/api/history', (req, res) => {
    const { error } = validateQuote(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });
    history.unshift(req.body);
    res.send(req.body);
});

app.get('/api/address/:id', (req, res) => {
    let user = users.find(x => x.id == req.params.id);
    if (user != undefined) return res.send(JSON.stringify(user.address));
    return res.status(400).send({ "error": error.details[0].message });
});

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
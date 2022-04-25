require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passport = require("passport");
require("./passport")
const cookieSession = require("cookie-session");

// middlewares
app.use(cookieSession({ name: "session", keys: [`${process.env.COOKIE_KEY}`], maxAge: 24 * 60 * 60 * 1000 }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const Joi = require('joi');

const mysql = require('mysql2');
const { func } = require('joi');
var connection = mysql.createConnection({
    host: 'group22-db.mysql.database.azure.com',
    user: 'Group22admin',
    password: 'g7St@ch@',
    database: 'group_22_db'
});

const getHistory = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM fuelquote '
            + 'WHERE user_id=' + userId +
            ' ORDER BY quote_date DESC',
            function (error, results, fields) {
                if (error) return reject(error);
                return resolve(results.map(v => Object.assign({}, v)));
            });
    });
};

const addQuote = (quote) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO fuelquote (quote_date, delivery_date, delivery_address, gallons, ppg, total, user_id)'
            + 'VALUES (NOW(), ?, ?, ?, ?, ?, ?)', [quote.delivery_date, quote.delivery_address,
            quote.gallons, quote.ppg, quote.total, quote.userId], (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
    });
};

const getDeliveryAddress = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT address1 FROM users WHERE id=? LIMIT 1', [id], (error, result) => {
            if (error) {
                return reject(error);
            }
            console.log(result);
            if (result === undefined || result.length == 0) {
                return reject('No address for that id');
            }
            return resolve(result[0].address1);
        })
    })
};

//const getPrice = (userId, )


function validateFrontendQuote(quote) {
    const schema = Joi.object({
        quote_date: Joi.date().max('now').required(),
        gallons: Joi.number().min(1).max(500000).required(),
        delivery_date: Joi.date().min('now').required(),
        delivery_address: Joi.string().required(),
        userId: Joi.number().required()
    })
    return schema.validate(quote);
}

app.get('/api/history/:userId', async (req, res) => {
    try {
        const resultElements = await getHistory(req.params.userId);
        res.status(200).json(resultElements); // send a json response
    } catch (e) {
        console.log(e); // console log the error so we can see it in the console
        res.sendStatus(500);
    }
});

app.post('/api/history', async (req, res) => {
    const { error } = validateFrontendQuote(req.body);
    if (error) return res.status(400).send({ "error": error.details[0].message });
    try {
        const prices = await getSuggestedPrice(req.body.userId, req.body.gallons);
        req.body['ppg'] = prices['suggested'];
        req.body['total'] = prices['total']

        const result = await addQuote(req.body);
        res.status(200).json(prices);
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

const locationFactor = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT state FROM users WHERE id=${userId}`,
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                var res = {};
                if (result.length == 0)
                    res.state = 'TX';
                else
                    res = JSON.parse(JSON.stringify(result[0]));
                return resolve(res.state === 'TX' ? 0.02 : 0.04);
            });
    });
};

const rateHistoryFactor = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT COUNT(case user_id when ${id} then 1 else null end)`
            + 'FROM fuelquote',
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                const res = JSON.parse(JSON.stringify(result[0]));
                const count = Object.values(res)[0];
                //console.log(`Number of occurances of ${id}: ${count}`);
                return resolve(count > 0 ? 0.01 : 0.0);
            })
    })
}

gallonsReqFactor = (gallons) => {
    return gallons >= 1000 ? 0.02 : 0.03;
}

getSuggestedPrice = async (userId, gallons) => {
    const LF = await locationFactor(userId)
    console.log("Location factor: " + LF);
    const RHF = await rateHistoryFactor(userId)
    console.log("Rate History Factor: " + RHF);
    const GRF = gallonsReqFactor(gallons)
    console.log("Gallons Requested Factor: " + GRF);
    const CPF = 0.10;
    const currentPPG = 1.50;

    const margin = currentPPG * (LF - RHF + GRF + CPF)
    var suggestedPrice = currentPPG + margin;

    suggestedPrice = Math.round((suggestedPrice + Number.EPSILON) * 100) / 100
    console.log("Suggested Price: " + suggestedPrice);

    var total = suggestedPrice * gallons;
    // apply rounding to 2 decimals
    total = Math.round((total + Number.EPSILON) * 100) / 100
    const output = {
        'suggested': suggestedPrice,
        'total': total,
        'returning': RHF === 0.01 ? true : false
    };
    return output;
}

// Suggested price and total function
// Called for get quote (client) and submit (server)
app.get('/api/getquote/:id/:gallons', async (req, res) => {
    try {
        var output = await getSuggestedPrice(req.params.id, req.params.gallons);
        res.status(200).json(output);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
app.post("/api/profile",(req,res)=>
{
    const Name=req.body.Name;
    const address1=req.body.addy;
    const address2=req.body.addy2;
    const city=req.body.city;
    const zip =req.body.zip;
    const st=req.body.ST;
    const sqlInsert="UPDATE users (name, address1, address2, city,zip, st) VALUES(?,?,?,?,?,?,?)"
    +"WHERE ID ="+ localStorage.getItem('token');
    db.query(sqlInsert,[ Name, address1, address2, city,zip, st],(err,res)=>{
        console.log(err);
    } );
});



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

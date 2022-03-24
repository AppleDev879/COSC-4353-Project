const router = require("express").Router();
const { check, validationResult } = require("express-validator")
const { users } = require("../db"); 
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post("/signup", [
    check(
        "fullname",
        "Full name must be 2-50 characters. It cannot have special characters/numbers or start/end with spaces.")
    .isLength({min:2, max:50})
    .matches('^[a-zA-z]+([ ][a-zA-Z]+)*$'),
    check(
        "email",
        "Please provdie a valid email.")
    .isEmail(),
    check(
        "password",
        "Please enter a password with 8-20 characters that contains at least one uppercase letter, one lowercase letter, and at least one special character.",)
    .isLength({min:8, max:20})
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$"),

], async (req, res) => {
    const { fullname, email, password } = req.body;

    //Validate the input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //Validate if User exists
    let user = users.find((user) => {
        return user.email === email
    });

    if (user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "User already exists.",
                }
            ]
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    users.push({
        fullname,
        email,
        password: hashPassword
    })

    const token = JWT.sign({
        fullname, email,
    }, "secretonlyfortestingpurposes", {
        expiresIn: 259200
    })

    res.json({
        token
    })
})

router.post('/login', async (req,res) => {
    const { fullname, email, password } = req.body;

    let user = users.find((user) => {
        return user.email === email
    });

    if (!user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid credentials.",
                }
            ]
        })
    };

    let correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid credentials.",
                }
            ]
        })
    };
    
    const token = JWT.sign({
        fullname, email,
    }, "secretonlyfortestingpurposes", {
        expiresIn: 259200
    })

    res.json({
        token
    })
})

router.get("/all", (req, res) => {
    res.json(users)
})

module.exports = router
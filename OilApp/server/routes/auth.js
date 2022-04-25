const router = require("express").Router();
const { User } = require('../models/userSQL');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passport = require('passport')

const CLIENT_URL = "http://localhost:3000"

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ where: {email: req.body.email} });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		//res.status(200).send({ data: token, message: "logged in successfully" });
		const user_id = await User.findOne({where: {email: req.body.email}, attributes: ['id']});
		const id = user_id.getDataValue('id');
		res.status(200).json({
			success: true,
			message: "Login Successful",
			data: id
		});
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password'),
	});
	return schema.validate(data);
};

router.get("/login/success", (req, res) => {
    if(req.user)
    {
        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: req.user,
            cookies: req.cookies
        });
    }
})

router.get("/login/fail", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Login failed."
    })
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/login")
})

router.get("/google", passport.authenticate("google", { scope : ["profile"] }))

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/fail",
}))

router.get("/github", passport.authenticate("github", {scope : ["profile"]}))

router.get("/github/callback", passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/fail"
}))

router.get("/facebook", passport.authenticate("facebook", {scope : ["profile"]}))

router.get("/facebook/callback", passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/fail"
}))


module.exports = router;

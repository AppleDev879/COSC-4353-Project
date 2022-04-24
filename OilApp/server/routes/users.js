const router = require("express").Router();
const { User, validate } = require('../models/userSQL');
const bcrypt = require("bcrypt");

function onlyLetters(str) {
	return /^[a-zA-Z ]+$/.test(str);
}

router.post("/", async (req, res) => {
	try {
		if(!onlyLetters(req.body.fullName)){
			return res
			.status(409)
			.send({ message: "Full Name can only contain letters." });
		}
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ where: {email: req.body.email} });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await User.create({ name: req.body.fullName, email: req.body.email, password: hashPassword });
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

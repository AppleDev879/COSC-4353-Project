const { DataTypes } = require('sequelize');
const sequelize = require('./connection');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = sequelize.define('users', {
    name: { 
        type: DataTypes.STRING,
    },
    email: { 
        type: DataTypes.STRING,
    },
    password: { 
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

userSchema.prototype.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = sequelize.model("users", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		fullName: Joi.string().required().label("Full Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
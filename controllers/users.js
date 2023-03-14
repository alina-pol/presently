const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/users')


router.get("/", (req,res) => {
    res.render("../views/users/welcome.ejs")
})

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

router.post('/register', (req, res) => {

	const salt = bcrypt.genSaltSync(10)

	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)

	// first lets see if somebody else already has this username 
	User.findOne({username: req.body.username}, (err, userExists) => {
		if (userExists) {
			res.send('that username is taken')
		} else {
			User.create(req.body, (err, createdUser) => {
				console.log(createdUser)
				req.session.currentUser = createdUser
                res.redirect('/meditations')
			})
		}
	})
})

router.get('/signin', (req, res) => {
	res.render('users/signin.ejs')
})

router.post('/signin', (req, res) => {
	// we need to get the user with that username 
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if(foundUser) {
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
			if(validLogin) {
				req.session.currentUser = foundUser
                res.redirect('/meditations')
			} else {
				res.send('Invalid username or password')
			}
		} else {
			res.send('Invalid username or password')
		}
	})
})

// destroy session route

router.get('/signout', (req, res) => {
    //this will destroy the session
    req.session.destroy
    res.redirect('/users')
})



module.exports = router
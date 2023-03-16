const express = require('express')
const router = express.Router()
const Meditation = require("../models/meditations.js")

// custom middleware to require authentication on routes 
const authRequired = (req, res, next) => {
	console.log(req.session.currentUser)
	if (req.session.currentUser) {
		next() 
	} else {
		res.send('Please log in to edit the page')

	}
}


// ROUTES

// new
router.get("/new", (req,res) => {
    res.render("new.ejs")
})

// about
router.get("/about", (req,res) => {
    res.render("about.ejs")
})


// create
router.post("/", (req, res) => {
    Meditation.create(req.body, (err, createdMeditation) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(createdMeditation, "Created Meditation")
            res.redirect("/meditations");
        }
    });
});


// index
router.get("/", (req, res)=> {
    Meditation.find({}, (err, foundMeditations) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
    res.render("index.ejs", {
        meditations: foundMeditations
    })
    })

})

// show
router.get("/:id", (req, res) => {
	Meditation.findById(req.params.id, (err, foundMeditation) => {
        if (err) {
            console.log(err);
            res.send(err);
        } 
		res.render("show.ejs", {
			meditation: foundMeditation
        
		})
    
	})
})



router.delete('/:id', (req, res) => {
	Meditation.findByIdAndDelete(req.params.id, (err, deletedMeditation) => {
		if(err) {
			console.log(err)
			res.send(err)
		} else {
			console.log(deletedMeditation)
			res.redirect('/meditations')
		}
	})
})


// edit
router.get("/:id/edit", (req, res) => {
	Meditation.findById(req.params.id, (err, foundMeditation) => {
		if(err) {
			console.log(err)
			res.send(err)
		} else {
			res.render("edit.ejs", {
				meditation: foundMeditation
			})
		}
	})
})


//update
router.put('/:id', (req, res)=>{
    //{new: true} tells mongoose to send the updated model into the callback
    Meditation.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedMeditation)=>{
        res.redirect('/meditations')
    })
})


module.exports = router


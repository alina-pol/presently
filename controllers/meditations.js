const express = require('express')
const router = express.Router()
const Meditation = require("../models/meditations.js")

// index
router.get("/", (req, res)=> {
    Meditation.find({}, (err, foundMeditation) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
    res.render("index.ejs", {
        meditations: foundMeditation
    })
    })

})

// new
router.get('/new', (req,res) => {
    res.render('new.ejs')
})

// // delete
// router.delete("/:id", (req, res) => {
//     Product.findByIdAndRemove(req.params.id, (err, deletedMeditation) => {
//         console.log(deletedMeditation)
//         res.redirect("/meditations")
//     })
// });

// //update

// create
router.post('/', (req, res) => {
    Meditation.create(req.body, (err, createdMeditation) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(createdMeditation, 'Created Meditation')
            res.redirect('/meditations');
        }
    });
});

// edit


// show
router.get('/:_id', (req, res) => {
	Meditation.findById(req.params._id, (err, foundMeditation) => {
        if (err) {
            console.log(err);
            res.send(err);
        } 
		res.render('show.ejs', {
			meditation: foundMeditation
        
		})
    
	})
})


module.exports = router

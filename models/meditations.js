// fruit schema:
const mongoose = require('mongoose')

const meditationSchema = new mongoose.Schema({ 
    name: {type: String, required: true}, 
    description: {type: String}, 
    img: {type: String}, 
    duration: {type: Number}
    
})

const Meditation = mongoose.model('Meditation', meditationSchema)

module.exports = Meditation
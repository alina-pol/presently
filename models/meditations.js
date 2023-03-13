// fruit schema:
const mongoose = require('mongoose')

const meditationSchema = new mongoose.Schema({ 
    name: {type: String, required: true}, 
    description: String, 
    img: String, 
    
})

const Meditation = mongoose.model('Meditation', meditationSchema)

module.exports = Meditation
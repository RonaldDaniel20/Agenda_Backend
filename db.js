const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL
mongoose.set('strictQuery', false)


mongoose.connect(url).then(() => {
    console.log('Base de datos conectada')
}).catch(err => {
    console.error(err)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLenght: 3,
        require: true
    },
    number: {
        type: String,
        require: true,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{5,}$/.test(v)
            },
            message: props => `${props.value} no es número valido. Debe tener el formato xx-xxxxx o xxx-xxxxx`
        }
    }
})

const Person = mongoose.model('Person',personSchema)

module.exports = Person
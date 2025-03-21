const express = require('express')
const router = express.Router()

const { getContacts, information, getContact, deleteContact, addContact, updateContact } = require('../controllers/users')

router.get('/contacts', getContacts)
router.get('/info', information)
router.get('/contact/:id', getContact)
router.delete('/contact/:id', deleteContact)
router.post('/contact', addContact)
router.put('/contact/:id', updateContact)

module.exports = router